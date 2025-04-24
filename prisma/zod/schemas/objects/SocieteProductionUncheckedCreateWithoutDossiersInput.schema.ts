import { z } from 'zod';
import { DemandeurUncheckedCreateNestedManyWithoutSocieteProductionInputObjectSchema } from './DemandeurUncheckedCreateNestedManyWithoutSocieteProductionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionUncheckedCreateWithoutDossiersInput> =
  z
    .object({
      id: z.number().optional(),
      nom: z.string(),
      siret: z.string(),
      siren: z.string(),
      departement: z.string(),
      naf: z.string(),
      raisonSociale: z.string(),
      adresse: z.string(),
      adresseCodePostal: z.string(),
      adresseCodeCommune: z.string(),
      formeJuridique: z.string(),
      conventionCollectiveCode: z.string(),
      otherConventionCollective: z.string().optional().nullable(),
      demandeurs: z
        .lazy(
          () =>
            DemandeurUncheckedCreateNestedManyWithoutSocieteProductionInputObjectSchema,
        )
        .optional(),
    })
    .strict();

export const SocieteProductionUncheckedCreateWithoutDossiersInputObjectSchema =
  Schema;
