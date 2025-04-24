import { z } from 'zod';
import { DemandeurScalarWhereInputObjectSchema } from './DemandeurScalarWhereInput.schema';
import { DemandeurUpdateManyMutationInputObjectSchema } from './DemandeurUpdateManyMutationInput.schema';
import { DemandeurUncheckedUpdateManyWithoutDemandeursInputObjectSchema } from './DemandeurUncheckedUpdateManyWithoutDemandeursInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUpdateManyWithWhereWithoutSocieteProductionInput> =
  z
    .object({
      where: z.lazy(() => DemandeurScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => DemandeurUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => DemandeurUncheckedUpdateManyWithoutDemandeursInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const DemandeurUpdateManyWithWhereWithoutSocieteProductionInputObjectSchema =
  Schema;
