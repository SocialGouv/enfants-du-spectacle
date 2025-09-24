import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('[MIDDLEWARE] Requête interceptée:', pathname);

  // Vérifier si c'est un callback email de NextAuth
  if (pathname === '/api/auth/callback/email') {
    console.log('[MIDDLEWARE] Callback email détecté, validation du nonce...');
    return validateEmailCallback(request);
  }

  console.log('[MIDDLEWARE] Requête non concernée, passage...');
  return NextResponse.next();
}

async function validateEmailCallback(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = request.nextUrl;
  const urlNonce = searchParams.get('nonce');

  // Vérifier la présence du nonce dans l'URL
  if (!urlNonce) {
    console.warn('[AUTH MIDDLEWARE] Nonce manquant dans l\'URL');
    return redirectToLogin(request);
  }

  // Vérifier la présence du nonce dans les cookies
  const cookieNonce = request.cookies.get('auth-nonce');
  if (!cookieNonce) {
    console.warn('[AUTH MIDDLEWARE] Cookie auth-nonce manquant');
    return redirectToLogin(request);
  }

  // Vérifier que les nonces correspondent
  if (urlNonce !== cookieNonce.value) {
    console.warn('[AUTH MIDDLEWARE] Nonce URL vs Cookie ne correspondent pas');
    return redirectToLogin(request);
  }

  // Nonces valides - supprimer le cookie et laisser passer
  const response = NextResponse.next();
  response.cookies.delete('auth-nonce');
  
  console.log('[AUTH MIDDLEWARE] Validation réussie, cookie supprimé');
  return response;
}

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL('/login', request.url);
  const response = NextResponse.redirect(loginUrl);
  
  // Supprimer le cookie en cas d'échec
  response.cookies.delete('auth-nonce');
  
  return response;
}

export const config = {
  matcher: [], // TEMPORAIRE : désactiver le middleware pour test
};
