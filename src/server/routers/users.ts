import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { Role } from "@prisma/client";

const allowedRoles: Role[] = [Role.INSTRUCTEUR, Role.ADMIN, Role.MEMBRE, Role.MEDECIN];

export const usersRouter = router({
  getUsers: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ input, ctx }: { input: { page: number; limit: number }; ctx: any }) => {
      const { page, limit } = input;
      const skip = (page - 1) * limit;

      // Pour l'instant, on va créer une approche simple sans contexte
      // TODO: Intégrer Prisma via le contexte
      const { PrismaClient } = await import("@prisma/client");
      const prisma = new PrismaClient();
      
      try {
        // Récupérer les utilisateurs avec filtrage par rôle et pagination
        const [users, total] = await Promise.all([
          prisma.user.findMany({
            where: {
              role: {
                in: allowedRoles,
              },
            },
            skip,
            take: limit,
            orderBy: [
              { updatedAt: 'desc' },
              { email: 'asc' }
            ]
          }),
          prisma.user.count({
            where: {
              role: {
                in: allowedRoles,
              },
            },
          }),
        ]);

        const totalPages = Math.ceil(total / limit);
        
        return {
          users,
          total,
          page,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1 && totalPages > 1,
        };
      } finally {
        await prisma.$disconnect();
      }
    }),

  createUser: protectedProcedure
    .input(
      z.object({
        nom: z.string().nullable(),
        prenom: z.string().nullable(),
        email: z.string().email().nullable(),
        role: z.nativeEnum(Role).nullable(),
        departement: z.string().nullable(),
        departements: z.array(z.string()).default([]),
        telephone: z.string().nullable().optional(),
        fonction: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { PrismaClient } = await import("@prisma/client");
      const prisma = new PrismaClient();
      
      try {
        const newUser = await prisma.user.create({
          data: {
            nom: input.nom,
            prenom: input.prenom,
            email: input.email,
            role: input.role,
            departement: input.departement,
            departements: input.departements,
            telephone: input.telephone || null,
            fonction: input.fonction || null,
            emailVerified: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        return newUser;
      } finally {
        await prisma.$disconnect();
      }
    }),

  deleteUser: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { PrismaClient } = await import("@prisma/client");
      const prisma = new PrismaClient();
      
      try {
        await prisma.user.delete({
          where: {
            id: input.id,
          },
        });
        return { success: true };
      } finally {
        await prisma.$disconnect();
      }
    }),

  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        nom: z.string().nullable().optional(),
        prenom: z.string().nullable().optional(),
        email: z.string().email().nullable().optional(),
        role: z.nativeEnum(Role).nullable().optional(),
        departement: z.string().nullable().optional(),
        departements: z.array(z.string()).optional(),
        telephone: z.string().nullable().optional(),
        fonction: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { PrismaClient } = await import("@prisma/client");
      const prisma = new PrismaClient();
      
      try {
        const updatedUser = await prisma.user.update({
          where: {
            id: input.id,
          },
          data: {
            ...(input.nom !== undefined && { nom: input.nom }),
            ...(input.prenom !== undefined && { prenom: input.prenom }),
            ...(input.email !== undefined && { email: input.email }),
            ...(input.role !== undefined && { role: input.role }),
            ...(input.departement !== undefined && { departement: input.departement }),
            ...(input.departements !== undefined && { departements: input.departements }),
            ...(input.telephone !== undefined && { telephone: input.telephone }),
            ...(input.fonction !== undefined && { fonction: input.fonction }),
            updatedAt: new Date(),
          },
        });
        return updatedUser;
      } finally {
        await prisma.$disconnect();
      }
    }),
});
