import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DemandeurListRelationFilterObjectSchema } from './DemandeurListRelationFilter.schema';
import { DossierListRelationFilterObjectSchema } from './DossierListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SocieteProductionWhereInputObjectSchema),
        z.lazy(() => SocieteProductionWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SocieteProductionWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SocieteProductionWhereInputObjectSchema),
        z.lazy(() => SocieteProductionWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    nom: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    siret: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    siren: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    departement: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    naf: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    raisonSociale: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    adresse: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    adresseCodePostal: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    adresseCodeCommune: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    formeJuridique: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    conventionCollectiveCode: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    otherConventionCollective: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    demandeurs: z
      .lazy(() => DemandeurListRelationFilterObjectSchema)
      .optional(),
    dossiers: z.lazy(() => DossierListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const SocieteProductionWhereInputObjectSchema = Schema;
