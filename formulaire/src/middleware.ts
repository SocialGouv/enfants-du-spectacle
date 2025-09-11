import { NextRequest, NextResponse } from 'next/server';
import { nonceStore } from './lib/emailAuth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si c'est un callback email de NextAuth
  if (pathname === '/api/auth/callback/email') {
    return validateEmailCallback(request);
  }

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

  // Vérifier que le nonce existe dans notre store
  const storedNonceData = nonceStore.get(urlNonce);
  if (!storedNonceData) {
    console.warn('[AUTH MIDDLEWARE] Nonce non trouvé dans le store');
    return redirectToLogin(request);
  }

  // Vérifier que le nonce n'a pas expiré
  const now = Date.now();
  if (now > storedNonceData.expires) {
    console.warn('[AUTH MIDDLEWARE] Nonce expiré');
    nonceStore.delete(urlNonce); // Nettoyer le nonce expiré
    return redirectToLogin(request);
  }

  // Nonce valide - le supprimer du store et laisser passer
  nonceStore.delete(urlNonce);
  
  console.log('[AUTH MIDDLEWARE] Validation réussie, nonce supprimé du store');
  return NextResponse.next();
}

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL('/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/api/auth/callback/email'],
};
