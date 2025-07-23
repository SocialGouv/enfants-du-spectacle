import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  logUserAccess(request).catch(error => {
    console.error('[MIDDLEWARE] Erreur lors du logging:', error);
  });

  return NextResponse.next();
}

// Headers JSON communs
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
    const { accessType, resourceId } = determineAccessType(pathname);
    if (!accessType) return;
    
    const userAgent = request.headers.get('user-agent') || undefined;
    const ipAddress = getClientIP(request);
    const query = search ? search.substring(1) : undefined;
    
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

function determineAccessType(pathname: string): { accessType: string | null, resourceId: number | null } {
  const routeMatchers = [
    { pattern: /^\/api\/commissions$/, accessType: 'DOSSIER_LIST' },
    { pattern: /^\/api\/dossiers\/(\d+)/, accessType: 'DOSSIER_VIEW' },
    { pattern: /^\/api\/download\/pieces-dossier\/(\d+)/, accessType: 'PIECE_DOSSIER_DOWNLOAD' },
    { pattern: /^\/api\/download\/pieces-enfant\/(\d+)/, accessType: 'PIECE_ENFANT_DOWNLOAD' }
  ];

  for (const { pattern, accessType } of routeMatchers) {
    const match = pathname.match(pattern);
    if (match) {
      const resourceId = match[1] ? parseInt(match[1], 10) : null;
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

    await response.json(); // Pour ne pas laisser un warning de promesse non awaitée

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
