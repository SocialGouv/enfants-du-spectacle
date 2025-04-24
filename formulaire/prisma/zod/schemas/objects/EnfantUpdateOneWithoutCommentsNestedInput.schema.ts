import { z } from 'zod';
import { EnfantCreateWithoutCommentsInputObjectSchema } from './EnfantCreateWithoutCommentsInput.schema';
import { EnfantUncheckedCreateWithoutCommentsInputObjectSchema } from './EnfantUncheckedCreateWithoutCommentsInput.schema';
import { EnfantCreateOrConnectWithoutCommentsInputObjectSchema } from './EnfantCreateOrConnectWithoutCommentsInput.schema';
import { EnfantUpsertWithoutCommentsInputObjectSchema } from './EnfantUpsertWithoutCommentsInput.schema';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';
import { EnfantUpdateWithoutCommentsInputObjectSchema } from './EnfantUpdateWithoutCommentsInput.schema';
import { EnfantUncheckedUpdateWithoutCommentsInputObjectSchema } from './EnfantUncheckedUpdateWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpdateOneWithoutCommentsNestedInput> = z
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
    upsert: z
      .lazy(() => EnfantUpsertWithoutCommentsInputObjectSchema)
      .optional(),
    disconnect: z.boolean().optional(),
    delete: z.boolean().optional(),
    connect: z.lazy(() => EnfantWhereUniqueInputObjectSchema).optional(),
    update: z
      .union([
        z.lazy(() => EnfantUpdateWithoutCommentsInputObjectSchema),
        z.lazy(() => EnfantUncheckedUpdateWithoutCommentsInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const EnfantUpdateOneWithoutCommentsNestedInputObjectSchema = Schema;
