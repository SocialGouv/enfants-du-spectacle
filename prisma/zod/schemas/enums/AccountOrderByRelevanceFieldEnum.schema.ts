import { z } from 'zod';

export const AccountOrderByRelevanceFieldEnumSchema = z.enum([
  'type',
  'provider',
  'providerAccountId',
  'refresh_token',
  'access_token',
  'token_type',
  'scope',
  'id_token',
  'session_state',
  'oauth_token_secret',
  'oauth_token',
]);
