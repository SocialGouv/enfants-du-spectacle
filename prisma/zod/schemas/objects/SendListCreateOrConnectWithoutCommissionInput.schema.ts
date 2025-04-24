import { z } from 'zod';
import { SendListWhereUniqueInputObjectSchema } from './SendListWhereUniqueInput.schema';
import { SendListCreateWithoutCommissionInputObjectSchema } from './SendListCreateWithoutCommissionInput.schema';
import { SendListUncheckedCreateWithoutCommissionInputObjectSchema } from './SendListUncheckedCreateWithoutCommissionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListCreateOrConnectWithoutCommissionInput> =
  z
    .object({
      where: z.lazy(() => SendListWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => SendListCreateWithoutCommissionInputObjectSchema),
        z.lazy(() => SendListUncheckedCreateWithoutCommissionInputObjectSchema),
      ]),
    })
    .strict();

export const SendListCreateOrConnectWithoutCommissionInputObjectSchema = Schema;
