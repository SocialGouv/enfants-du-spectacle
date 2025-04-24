import { z } from 'zod';
import { CommissionWhereUniqueInputObjectSchema } from './CommissionWhereUniqueInput.schema';
import { CommissionCreateWithoutDossiersInputObjectSchema } from './CommissionCreateWithoutDossiersInput.schema';
import { CommissionUncheckedCreateWithoutDossiersInputObjectSchema } from './CommissionUncheckedCreateWithoutDossiersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionCreateOrConnectWithoutDossiersInput> =
  z
    .object({
      where: z.lazy(() => CommissionWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CommissionCreateWithoutDossiersInputObjectSchema),
        z.lazy(() => CommissionUncheckedCreateWithoutDossiersInputObjectSchema),
      ]),
    })
    .strict();

export const CommissionCreateOrConnectWithoutDossiersInputObjectSchema = Schema;
