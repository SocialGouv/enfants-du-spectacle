import { z } from 'zod';
import { SendListWhereUniqueInputObjectSchema } from './SendListWhereUniqueInput.schema';
import { SendListUpdateWithoutUserInputObjectSchema } from './SendListUpdateWithoutUserInput.schema';
import { SendListUncheckedUpdateWithoutUserInputObjectSchema } from './SendListUncheckedUpdateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SendListWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => SendListUpdateWithoutUserInputObjectSchema),
        z.lazy(() => SendListUncheckedUpdateWithoutUserInputObjectSchema),
      ]),
    })
    .strict();

export const SendListUpdateWithWhereUniqueWithoutUserInputObjectSchema = Schema;
