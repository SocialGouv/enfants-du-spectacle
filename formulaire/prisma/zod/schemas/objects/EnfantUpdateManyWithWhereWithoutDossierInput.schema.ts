import { z } from 'zod';
import { EnfantScalarWhereInputObjectSchema } from './EnfantScalarWhereInput.schema';
import { EnfantUpdateManyMutationInputObjectSchema } from './EnfantUpdateManyMutationInput.schema';
import { EnfantUncheckedUpdateManyWithoutEnfantsInputObjectSchema } from './EnfantUncheckedUpdateManyWithoutEnfantsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpdateManyWithWhereWithoutDossierInput> = z
  .object({
    where: z.lazy(() => EnfantScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => EnfantUpdateManyMutationInputObjectSchema),
      z.lazy(() => EnfantUncheckedUpdateManyWithoutEnfantsInputObjectSchema),
    ]),
  })
  .strict();

export const EnfantUpdateManyWithWhereWithoutDossierInputObjectSchema = Schema;
