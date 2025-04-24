import { z } from 'zod';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';
import { EnfantCreateWithoutRemunerationInputObjectSchema } from './EnfantCreateWithoutRemunerationInput.schema';
import { EnfantUncheckedCreateWithoutRemunerationInputObjectSchema } from './EnfantUncheckedCreateWithoutRemunerationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantCreateOrConnectWithoutRemunerationInput> =
  z
    .object({
      where: z.lazy(() => EnfantWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => EnfantCreateWithoutRemunerationInputObjectSchema),
        z.lazy(() => EnfantUncheckedCreateWithoutRemunerationInputObjectSchema),
      ]),
    })
    .strict();

export const EnfantCreateOrConnectWithoutRemunerationInputObjectSchema = Schema;
