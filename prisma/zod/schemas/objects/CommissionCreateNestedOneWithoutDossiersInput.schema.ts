import { z } from 'zod';
import { CommissionCreateWithoutDossiersInputObjectSchema } from './CommissionCreateWithoutDossiersInput.schema';
import { CommissionUncheckedCreateWithoutDossiersInputObjectSchema } from './CommissionUncheckedCreateWithoutDossiersInput.schema';
import { CommissionCreateOrConnectWithoutDossiersInputObjectSchema } from './CommissionCreateOrConnectWithoutDossiersInput.schema';
import { CommissionWhereUniqueInputObjectSchema } from './CommissionWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionCreateNestedOneWithoutDossiersInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommissionCreateWithoutDossiersInputObjectSchema),
          z.lazy(
            () => CommissionUncheckedCreateWithoutDossiersInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => CommissionCreateOrConnectWithoutDossiersInputObjectSchema)
        .optional(),
      connect: z.lazy(() => CommissionWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const CommissionCreateNestedOneWithoutDossiersInputObjectSchema = Schema;
