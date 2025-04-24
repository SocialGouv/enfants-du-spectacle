import { z } from 'zod';
import { EnfantCreateWithoutCommentsInputObjectSchema } from './EnfantCreateWithoutCommentsInput.schema';
import { EnfantUncheckedCreateWithoutCommentsInputObjectSchema } from './EnfantUncheckedCreateWithoutCommentsInput.schema';
import { EnfantCreateOrConnectWithoutCommentsInputObjectSchema } from './EnfantCreateOrConnectWithoutCommentsInput.schema';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantCreateNestedOneWithoutCommentsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => EnfantCreateWithoutCommentsInputObjectSchema),
        z.lazy(() => EnfantUncheckedCreateWithoutCommentsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => EnfantCreateOrConnectWithoutCommentsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => EnfantWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const EnfantCreateNestedOneWithoutCommentsInputObjectSchema = Schema;
