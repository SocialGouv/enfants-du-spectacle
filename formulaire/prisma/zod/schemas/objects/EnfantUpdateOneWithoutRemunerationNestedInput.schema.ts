import { z } from 'zod';
import { EnfantCreateWithoutRemunerationInputObjectSchema } from './EnfantCreateWithoutRemunerationInput.schema';
import { EnfantUncheckedCreateWithoutRemunerationInputObjectSchema } from './EnfantUncheckedCreateWithoutRemunerationInput.schema';
import { EnfantCreateOrConnectWithoutRemunerationInputObjectSchema } from './EnfantCreateOrConnectWithoutRemunerationInput.schema';
import { EnfantUpsertWithoutRemunerationInputObjectSchema } from './EnfantUpsertWithoutRemunerationInput.schema';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';
import { EnfantUpdateWithoutRemunerationInputObjectSchema } from './EnfantUpdateWithoutRemunerationInput.schema';
import { EnfantUncheckedUpdateWithoutRemunerationInputObjectSchema } from './EnfantUncheckedUpdateWithoutRemunerationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpdateOneWithoutRemunerationNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => EnfantCreateWithoutRemunerationInputObjectSchema),
          z.lazy(
            () => EnfantUncheckedCreateWithoutRemunerationInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => EnfantCreateOrConnectWithoutRemunerationInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => EnfantUpsertWithoutRemunerationInputObjectSchema)
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => EnfantWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => EnfantUpdateWithoutRemunerationInputObjectSchema),
          z.lazy(
            () => EnfantUncheckedUpdateWithoutRemunerationInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const EnfantUpdateOneWithoutRemunerationNestedInputObjectSchema = Schema;
