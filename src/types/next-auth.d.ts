import 'next-auth';
import { User } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    dbUser: User;
  }
}
