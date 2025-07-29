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
    const { accessType, resourceId } = determineAccessType(pathname, queryString);
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
      resourceId
    };
    
    await saveUserLog(logData);
    
  } catch (error) {
    console.error('[MIDDLEWARE] Erreur lors du logging:', error);
  }
}

function determineAccessType(pathname: string, queryString: string): { accessType: string | null, resourceId: number | null } {
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

  const routeMatchers = [
    { 
      pattern: /^\/api\/commissions$/, 
      accessType: (pathname: string, queryString: string) => {
        const withChild = getQueryParam(queryString, 'withChild');
        return withChild === 'false' ? 'COMMISSION_LIST' : 'DOSSIER_LIST';
      }
    },
    { pattern: /^\/api\/dossiers\/(\d+)/, accessType: 'DOSSIER_VIEW' },
    { pattern: /^\/api\/download\/pieces-dossier\/(\d+)/, accessType: 'PIECE_DOSSIER_DOWNLOAD' },
    { pattern: /^\/api\/download\/pieces-enfant\/(\d+)/, accessType: 'PIECE_ENFANT_DOWNLOAD' }
  ];

  for (const matcher of routeMatchers) {
    const match = pathname.match(matcher.pattern);
    if (match) {
      const resourceId = match[1] ? parseInt(match[1], 10) : null;
      const accessType = typeof matcher.accessType === 'function' 
        ? matcher.accessType(pathname, queryString)
        : matcher.accessType;
      return { accessType, resourceId };
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
    '/api/download/pieces-dossier/:path*',
    '/api/download/pieces-enfant/:path*'
  ],
};
