import { z } from 'zod';
import { SendListWhereUniqueInputObjectSchema } from './SendListWhereUniqueInput.schema';
import { SendListCreateWithoutUserInputObjectSchema } from './SendListCreateWithoutUserInput.schema';
import { SendListUncheckedCreateWithoutUserInputObjectSchema } from './SendListUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => SendListWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => SendListCreateWithoutUserInputObjectSchema),
      z.lazy(() => SendListUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const SendListCreateOrConnectWithoutUserInputObjectSchema = Schema;
