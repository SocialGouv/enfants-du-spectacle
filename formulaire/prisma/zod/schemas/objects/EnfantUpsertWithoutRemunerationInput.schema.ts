import { z } from 'zod';
import { EnfantUpdateWithoutRemunerationInputObjectSchema } from './EnfantUpdateWithoutRemunerationInput.schema';
import { EnfantUncheckedUpdateWithoutRemunerationInputObjectSchema } from './EnfantUncheckedUpdateWithoutRemunerationInput.schema';
import { EnfantCreateWithoutRemunerationInputObjectSchema } from './EnfantCreateWithoutRemunerationInput.schema';
import { EnfantUncheckedCreateWithoutRemunerationInputObjectSchema } from './EnfantUncheckedCreateWithoutRemunerationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpsertWithoutRemunerationInput> = z
  .object({
    update: z.union([
      z.lazy(() => EnfantUpdateWithoutRemunerationInputObjectSchema),
      z.lazy(() => EnfantUncheckedUpdateWithoutRemunerationInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => EnfantCreateWithoutRemunerationInputObjectSchema),
      z.lazy(() => EnfantUncheckedCreateWithoutRemunerationInputObjectSchema),
    ]),
  })
  .strict();

export const EnfantUpsertWithoutRemunerationInputObjectSchema = Schema;
