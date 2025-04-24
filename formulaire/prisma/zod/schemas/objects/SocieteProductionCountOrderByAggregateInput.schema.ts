import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionCountOrderByAggregateInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    nom: z.lazy(() => SortOrderSchema).optional(),
    siret: z.lazy(() => SortOrderSchema).optional(),
    siren: z.lazy(() => SortOrderSchema).optional(),
    departement: z.lazy(() => SortOrderSchema).optional(),
    naf: z.lazy(() => SortOrderSchema).optional(),
    raisonSociale: z.lazy(() => SortOrderSchema).optional(),
    adresse: z.lazy(() => SortOrderSchema).optional(),
    adresseCodePostal: z.lazy(() => SortOrderSchema).optional(),
    adresseCodeCommune: z.lazy(() => SortOrderSchema).optional(),
    formeJuridique: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const SocieteProductionCountOrderByAggregateInputObjectSchema = Schema;
