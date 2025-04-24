import { z } from 'zod';
import { EnfantCreateWithoutRemunerationInputObjectSchema } from './EnfantCreateWithoutRemunerationInput.schema';
import { EnfantUncheckedCreateWithoutRemunerationInputObjectSchema } from './EnfantUncheckedCreateWithoutRemunerationInput.schema';
import { EnfantCreateOrConnectWithoutRemunerationInputObjectSchema } from './EnfantCreateOrConnectWithoutRemunerationInput.schema';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantCreateNestedOneWithoutRemunerationInput> =
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
      connect: z.lazy(() => EnfantWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const EnfantCreateNestedOneWithoutRemunerationInputObjectSchema = Schema;
