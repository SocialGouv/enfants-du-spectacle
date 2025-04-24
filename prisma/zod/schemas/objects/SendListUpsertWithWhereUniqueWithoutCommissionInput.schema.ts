import { z } from 'zod';
import { SendListWhereUniqueInputObjectSchema } from './SendListWhereUniqueInput.schema';
import { SendListUpdateWithoutCommissionInputObjectSchema } from './SendListUpdateWithoutCommissionInput.schema';
import { SendListUncheckedUpdateWithoutCommissionInputObjectSchema } from './SendListUncheckedUpdateWithoutCommissionInput.schema';
import { SendListCreateWithoutCommissionInputObjectSchema } from './SendListCreateWithoutCommissionInput.schema';
import { SendListUncheckedCreateWithoutCommissionInputObjectSchema } from './SendListUncheckedCreateWithoutCommissionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListUpsertWithWhereUniqueWithoutCommissionInput> =
  z
    .object({
      where: z.lazy(() => SendListWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => SendListUpdateWithoutCommissionInputObjectSchema),
        z.lazy(() => SendListUncheckedUpdateWithoutCommissionInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => SendListCreateWithoutCommissionInputObjectSchema),
        z.lazy(() => SendListUncheckedCreateWithoutCommissionInputObjectSchema),
      ]),
    })
    .strict();

export const SendListUpsertWithWhereUniqueWithoutCommissionInputObjectSchema =
  Schema;
