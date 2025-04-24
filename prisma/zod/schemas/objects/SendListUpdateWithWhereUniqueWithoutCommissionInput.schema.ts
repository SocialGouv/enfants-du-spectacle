import { z } from 'zod';
import { SendListWhereUniqueInputObjectSchema } from './SendListWhereUniqueInput.schema';
import { SendListUpdateWithoutCommissionInputObjectSchema } from './SendListUpdateWithoutCommissionInput.schema';
import { SendListUncheckedUpdateWithoutCommissionInputObjectSchema } from './SendListUncheckedUpdateWithoutCommissionInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListUpdateWithWhereUniqueWithoutCommissionInput> =
  z
    .object({
      where: z.lazy(() => SendListWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => SendListUpdateWithoutCommissionInputObjectSchema),
        z.lazy(() => SendListUncheckedUpdateWithoutCommissionInputObjectSchema),
      ]),
    })
    .strict();

export const SendListUpdateWithWhereUniqueWithoutCommissionInputObjectSchema =
  Schema;
