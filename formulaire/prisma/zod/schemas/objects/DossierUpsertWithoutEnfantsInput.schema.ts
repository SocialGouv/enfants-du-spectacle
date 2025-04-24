import { z } from 'zod';
import { DossierUpdateWithoutEnfantsInputObjectSchema } from './DossierUpdateWithoutEnfantsInput.schema';
import { DossierUncheckedUpdateWithoutEnfantsInputObjectSchema } from './DossierUncheckedUpdateWithoutEnfantsInput.schema';
import { DossierCreateWithoutEnfantsInputObjectSchema } from './DossierCreateWithoutEnfantsInput.schema';
import { DossierUncheckedCreateWithoutEnfantsInputObjectSchema } from './DossierUncheckedCreateWithoutEnfantsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpsertWithoutEnfantsInput> = z
  .object({
    update: z.union([
      z.lazy(() => DossierUpdateWithoutEnfantsInputObjectSchema),
      z.lazy(() => DossierUncheckedUpdateWithoutEnfantsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => DossierCreateWithoutEnfantsInputObjectSchema),
      z.lazy(() => DossierUncheckedCreateWithoutEnfantsInputObjectSchema),
    ]),
  })
  .strict();

export const DossierUpsertWithoutEnfantsInputObjectSchema = Schema;
