import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

/**
 * Custom Prisma Adapter to handle the column name mismatch between camelCase and snake_case
 * after database consolidation
 * 
 * @param prisma - PrismaClient instance
 * @returns Modified PrismaAdapter
 */
export function customPrismaAdapter(prisma: PrismaClient): Adapter {
  const adapter = PrismaAdapter(prisma);
  
  // Override the methods that use sessionToken to use session_token instead
  return {
    ...adapter,
    getSessionAndUser: async (sessionToken: string) => {
      // Use SQL query to directly access the session_token column
      const result = await prisma.$queryRaw`
        SELECT s.*, u.* 
        FROM "Session" s 
        JOIN "User" u ON s."user_id" = u.id 
        WHERE s."session_token" = ${sessionToken}
      `;
      
      if (!result || (Array.isArray(result) && result.length === 0)) {
        return null;
      }
      
      const userAndSession = Array.isArray(result) ? result[0] : result;
      
      // Construct the user and session objects
      const user = {
        id: userAndSession.id,
        name: userAndSession.name,
        email: userAndSession.email,
        emailVerified: userAndSession.emailVerified,
        image: userAndSession.image,
        nom: userAndSession.nom,
        prenom: userAndSession.prenom,
        role: userAndSession.role,
        departement: userAndSession.departement,
        departements: userAndSession.departements,
        telephone: userAndSession.telephone,
        fonction: userAndSession.fonction
      };
      
      const session = {
        id: userAndSession.id,
        sessionToken: userAndSession.session_token,
        userId: userAndSession.user_id,
        expires: userAndSession.expires
      };
      
      return { user, session };
    },
    updateSession: async (data: any) => {
      await prisma.$executeRaw`
        UPDATE "Session" 
        SET "expires" = ${data.expires} 
        WHERE "session_token" = ${data.sessionToken}
      `;
      
      // Fetch and return the updated session
      const result = await prisma.$queryRaw`
        SELECT * FROM "Session" WHERE "session_token" = ${data.sessionToken}
      `;
      
      if (!result || (Array.isArray(result) && result.length === 0)) {
        return null;
      }
      
      const session = Array.isArray(result) ? result[0] : result;
      return {
        id: session.id,
        sessionToken: session.session_token,
        userId: session.user_id,
        expires: session.expires
      };
    },
    deleteSession: async (sessionToken: string) => {
      await prisma.$executeRaw`
        DELETE FROM "Session" 
        WHERE "session_token" = ${sessionToken}
      `;
      // Return void as expected by the adapter interface
      return;
    },
  };
}
