import { z } from 'zod';
import { SendListWhereUniqueInputObjectSchema } from './SendListWhereUniqueInput.schema';
import { SendListUpdateWithoutUserInputObjectSchema } from './SendListUpdateWithoutUserInput.schema';
import { SendListUncheckedUpdateWithoutUserInputObjectSchema } from './SendListUncheckedUpdateWithoutUserInput.schema';
import { SendListCreateWithoutUserInputObjectSchema } from './SendListCreateWithoutUserInput.schema';
import { SendListUncheckedCreateWithoutUserInputObjectSchema } from './SendListUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SendListWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => SendListUpdateWithoutUserInputObjectSchema),
        z.lazy(() => SendListUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => SendListCreateWithoutUserInputObjectSchema),
        z.lazy(() => SendListUncheckedCreateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();

export const SendListUpsertWithWhereUniqueWithoutUserInputObjectSchema = Schema;
