import { z } from 'zod';
import { EnfantUpdateWithoutCommentsInputObjectSchema } from './EnfantUpdateWithoutCommentsInput.schema';
import { EnfantUncheckedUpdateWithoutCommentsInputObjectSchema } from './EnfantUncheckedUpdateWithoutCommentsInput.schema';
import { EnfantCreateWithoutCommentsInputObjectSchema } from './EnfantCreateWithoutCommentsInput.schema';
import { EnfantUncheckedCreateWithoutCommentsInputObjectSchema } from './EnfantUncheckedCreateWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpsertWithoutCommentsInput> = z
  .object({
    update: z.union([
      z.lazy(() => EnfantUpdateWithoutCommentsInputObjectSchema),
      z.lazy(() => EnfantUncheckedUpdateWithoutCommentsInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => EnfantCreateWithoutCommentsInputObjectSchema),
      z.lazy(() => EnfantUncheckedCreateWithoutCommentsInputObjectSchema),
    ]),
  })
  .strict();

export const EnfantUpsertWithoutCommentsInputObjectSchema = Schema;
