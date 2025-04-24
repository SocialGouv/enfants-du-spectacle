import { z } from 'zod';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';
import { EnfantCreateWithoutCommentsInputObjectSchema } from './EnfantCreateWithoutCommentsInput.schema';
import { EnfantUncheckedCreateWithoutCommentsInputObjectSchema } from './EnfantUncheckedCreateWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantCreateOrConnectWithoutCommentsInput> = z
  .object({
    where: z.lazy(() => EnfantWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => EnfantCreateWithoutCommentsInputObjectSchema),
      z.lazy(() => EnfantUncheckedCreateWithoutCommentsInputObjectSchema),
    ]),
  })
  .strict();

export const EnfantCreateOrConnectWithoutCommentsInputObjectSchema = Schema;
