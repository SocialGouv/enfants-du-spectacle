import { z } from 'zod';
import { EnfantScalarWhereInputObjectSchema } from './EnfantScalarWhereInput.schema';
import { EnfantUpdateManyMutationInputObjectSchema } from './EnfantUpdateManyMutationInput.schema';
import { EnfantUncheckedUpdateManyWithoutEnfantInputObjectSchema } from './EnfantUncheckedUpdateManyWithoutEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpdateManyWithWhereWithoutPopulatedByInput> =
  z
    .object({
      where: z.lazy(() => EnfantScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => EnfantUpdateManyMutationInputObjectSchema),
        z.lazy(() => EnfantUncheckedUpdateManyWithoutEnfantInputObjectSchema),
      ]),
    })
    .strict();

export const EnfantUpdateManyWithWhereWithoutPopulatedByInputObjectSchema =
  Schema;
