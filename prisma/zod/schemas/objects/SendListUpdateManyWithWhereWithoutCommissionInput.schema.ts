import { z } from 'zod';
import { SendListScalarWhereInputObjectSchema } from './SendListScalarWhereInput.schema';
import { SendListUpdateManyMutationInputObjectSchema } from './SendListUpdateManyMutationInput.schema';
import { SendListUncheckedUpdateManyWithoutSendListInputObjectSchema } from './SendListUncheckedUpdateManyWithoutSendListInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListUpdateManyWithWhereWithoutCommissionInput> =
  z
    .object({
      where: z.lazy(() => SendListScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => SendListUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => SendListUncheckedUpdateManyWithoutSendListInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const SendListUpdateManyWithWhereWithoutCommissionInputObjectSchema =
  Schema;
