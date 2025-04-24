import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionUncheckedCreateWithoutDemandeurInput> =
  z
    .object({
      id: z.number().optional(),
      nom: z.string().optional().nullable(),
      siret: z.string().optional().nullable(),
      siren: z.string().optional().nullable(),
      departement: z.string().optional().nullable(),
      naf: z.string().optional().nullable(),
      raisonSociale: z.string().optional().nullable(),
      adresse: z.string().optional().nullable(),
      adresseCodePostal: z.string().optional().nullable(),
      adresseCodeCommune: z.string().optional().nullable(),
      formeJuridique: z.string().optional().nullable(),
    })
    .strict();

export const SocieteProductionUncheckedCreateWithoutDemandeurInputObjectSchema =
  Schema;
