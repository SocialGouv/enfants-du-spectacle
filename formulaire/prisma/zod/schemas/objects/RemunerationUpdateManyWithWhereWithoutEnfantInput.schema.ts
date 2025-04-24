import { z } from 'zod';
import { RemunerationScalarWhereInputObjectSchema } from './RemunerationScalarWhereInput.schema';
import { RemunerationUpdateManyMutationInputObjectSchema } from './RemunerationUpdateManyMutationInput.schema';
import { RemunerationUncheckedUpdateManyWithoutRemunerationInputObjectSchema } from './RemunerationUncheckedUpdateManyWithoutRemunerationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationUpdateManyWithWhereWithoutEnfantInput> =
  z
    .object({
      where: z.lazy(() => RemunerationScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => RemunerationUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            RemunerationUncheckedUpdateManyWithoutRemunerationInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const RemunerationUpdateManyWithWhereWithoutEnfantInputObjectSchema =
  Schema;
