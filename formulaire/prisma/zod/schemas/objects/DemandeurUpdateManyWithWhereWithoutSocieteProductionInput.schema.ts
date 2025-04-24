import { z } from 'zod';
import { DemandeurScalarWhereInputObjectSchema } from './DemandeurScalarWhereInput.schema';
import { DemandeurUpdateManyMutationInputObjectSchema } from './DemandeurUpdateManyMutationInput.schema';
import { DemandeurUncheckedUpdateManyWithoutDemandeurInputObjectSchema } from './DemandeurUncheckedUpdateManyWithoutDemandeurInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUpdateManyWithWhereWithoutSocieteProductionInput> =
  z
    .object({
      where: z.lazy(() => DemandeurScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => DemandeurUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => DemandeurUncheckedUpdateManyWithoutDemandeurInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const DemandeurUpdateManyWithWhereWithoutSocieteProductionInputObjectSchema =
  Schema;
