import { z } from 'zod';
import { DossierUpdateWithoutCommentsInputObjectSchema } from './DossierUpdateWithoutCommentsInput.schema';
import { DossierUncheckedUpdateWithoutCommentsInputObjectSchema } from './DossierUncheckedUpdateWithoutCommentsInput.schema';
import { DossierCreateWithoutCommentsInputObjectSchema } from './DossierCreateWithoutCommentsInput.schema';
import { DossierUncheckedCreateWithoutCommentsInputObjectSchema } from './DossierUncheckedCreateWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpsertWithoutCommentsInput> = z
  .object({
    update: z.union([
      z.lazy(() => DossierUpdateWithoutCommentsInputObjectSchema),
      z.lazy(() => DossierUncheckedUpdateWithoutCommentsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => DossierCreateWithoutCommentsInputObjectSchema),
      z.lazy(() => DossierUncheckedCreateWithoutCommentsInputObjectSchema),
    ]),
  })
  .strict();

export const DossierUpsertWithoutCommentsInputObjectSchema = Schema;
