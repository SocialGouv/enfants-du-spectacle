import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  logUserAccess(request).catch(error => {
    console.error('[MIDDLEWARE] Erreur lors du logging:', error);
  });

  return NextResponse.next();
}

const jsonHeaders = {
  'Content-Type': 'application/json'
};

async function logUserAccess(request: NextRequest): Promise<void> {
  try {
    const sessionToken = request.cookies.get('next-auth.session-token') || 
                         request.cookies.get('__Secure-next-auth.session-token');
    
    if (!sessionToken) return;
    
    const userInfo = await getUserFromSession(sessionToken);
    if (!userInfo) return;
    
    const { pathname, search } = request.nextUrl;
    const queryString = search ? search.substring(1) : '';
    const { accessType, resourceId, modifications } = await determineAccessType(pathname, queryString, request.method, request);
    if (!accessType) return;
    
    const userAgent = request.headers.get('user-agent') || undefined;
    const ipAddress = getClientIP(request);
    const query = queryString;
    
    const logData = {
      userId: userInfo.userId,
      userEmail: userInfo.email || undefined,
      userRole: userInfo.role || undefined,
      method: request.method,
      path: pathname,
      query,
      userAgent,
      ipAddress,
      accessType,
      resourceId,
      modifications: modifications ? JSON.stringify(modifications) : undefined
    };
    
    await saveUserLog(logData);
    
  } catch (error) {
    console.error('[MIDDLEWARE] Erreur lors du logging:', error);
  }
}

async function determineAccessType(pathname: string, queryString: string, method: string, request: NextRequest): Promise<{ accessType: string | null, resourceId: number | null, modifications?: any }> {
  // Helper function pour parser les paramètres de query
  const getQueryParam = (queryString: string, paramName: string): string | null => {
    if (!queryString) return null;
    const params = queryString.split('&');
    for (const param of params) {
      const [key, value] = param.split('=');
      if (key === paramName) {
        return decodeURIComponent(value || '');
      }
    }
    return null;
  };

  // Helper function pour parser le body pour les routes pièces
  const getRequestBody = async (request: NextRequest): Promise<any> => {
    try {
      // Clone la requête pour ne pas consommer le body original
      const clonedRequest = request.clone();
      const body = await clonedRequest.text();
      return body ? JSON.parse(body) : null;
    } catch (error) {
      console.error('[MIDDLEWARE] Erreur parsing body:', error);
      return null;
    }
  };

  const routeMatchers = [
    { 
      pattern: /^\/api\/commissions$/, 
      handler: (pathname: string, queryString: string, method: string) => {
        const withChild = getQueryParam(queryString, 'withChild');
        return {
          accessType: withChild === 'false' ? 'COMMISSION_LIST' : 'DOSSIER_LIST',
          resourceId: null,
          modifications: undefined
        };
      }
    },
    { 
      pattern: /^\/api\/dossiers\/(\d+)/, 
      handler: async (pathname: string, queryString: string, method: string, request: NextRequest, match: RegExpMatchArray) => {
        const resourceId = match[1] ? parseInt(match[1], 10) : null;
        
        if (method === 'PUT') {
          const body = await getRequestBody(request);
          const modifications = body?.statut ? { statut: body.statut } : undefined;
          return {
            accessType: 'DOSSIER_UPDATE',
            resourceId,
            modifications
          };
        }
        
        return {
          accessType: 'DOSSIER_VIEW',
          resourceId,
          modifications: undefined
        };
      }
    },
    { 
      pattern: /^\/api\/enfant\/(\d+)/, 
      handler: async (pathname: string, queryString: string, method: string, request: NextRequest, match: RegExpMatchArray) => {
        if (method !== 'PUT') return { accessType: null, resourceId: null };
        
        const resourceId = match[1] ? parseInt(match[1], 10) : null;
        const body = await getRequestBody(request);
        const modifications = body?.cdc !== undefined ? { cdc: body.cdc } : undefined;
        
        return {
          accessType: 'ENFANT_UPDATE',
          resourceId,
          modifications
        };
      }
    },
    { 
      pattern: /^\/api\/sync\/out\/pieces$/, 
      handler: async (pathname: string, queryString: string, method: string, request: NextRequest) => {
        if (method !== 'PUT') return { accessType: null, resourceId: null };
        
        const body = await getRequestBody(request);
        if (!body || !body.type) return { accessType: null, resourceId: null };
        
        const resourceId = body.id ? parseInt(body.id, 10) : null;
        const modifications = body.statut ? { statut: body.statut } : undefined;
        const accessType = body.type === 'Enfant' ? 'PIECE_ENFANT_UPDATE' : 'PIECE_DOSSIER_UPDATE';
        
        return {
          accessType,
          resourceId,
          modifications
        };
      }
    },
    { 
      pattern: /^\/api\/download\/pieces-dossier\/(\d+)/, 
      handler: (pathname: string, queryString: string, method: string, request: NextRequest, match: RegExpMatchArray) => {
        const resourceId = match[1] ? parseInt(match[1], 10) : null;
        return {
          accessType: 'PIECE_DOSSIER_DOWNLOAD',
          resourceId,
          modifications: undefined
        };
      }
    },
    { 
      pattern: /^\/api\/download\/pieces-enfant\/(\d+)/, 
      handler: (pathname: string, queryString: string, method: string, request: NextRequest, match: RegExpMatchArray) => {
        const resourceId = match[1] ? parseInt(match[1], 10) : null;
        return {
          accessType: 'PIECE_ENFANT_DOWNLOAD',
          resourceId,
          modifications: undefined
        };
      }
    }
  ];

  for (const matcher of routeMatchers) {
    const match = pathname.match(matcher.pattern);
    if (match) {
      const result = matcher.handler(pathname, queryString, method, request, match);
      const resolvedResult = result instanceof Promise ? await result : result;
      
      if (resolvedResult.accessType) {
        return resolvedResult;
      }
    }
  }

  return { accessType: null, resourceId: null };
}

async function getUserFromSession(sessionToken: string): Promise<{ userId: number, email?: string, role?: string } | null> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/internal/session`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify({ sessionToken })
    });
    
    if (!response.ok) return null;
    
    const sessionData = await response.json();
    return sessionData.user || null;
  } catch (error) {
    console.error('[MIDDLEWARE] Erreur lors de la récupération de la session:', error);
    return null;
  }
}

function getClientIP(request: NextRequest): string | undefined {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP;
  
  return request.ip || undefined;
}

async function saveUserLog(logData: any): Promise<void> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/internal/user-logs`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(logData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${response.status} - ${errorData.error}`);
    }

    await response.json();

  } catch (error) {
    console.error('[MIDDLEWARE] saveUserLog - erreur lors de l\'insertion:', error);
    throw error;
  }
}

export const config = {
  matcher: [
    '/api/commissions',
    '/api/dossiers/:path*',
    '/api/enfant/:path*',
    '/api/sync/out/pieces',
    '/api/download/pieces-dossier/:path*',
    '/api/download/pieces-enfant/:path*'
  ],
};
