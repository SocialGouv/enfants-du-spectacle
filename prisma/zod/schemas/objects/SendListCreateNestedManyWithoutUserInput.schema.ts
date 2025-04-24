import { z } from 'zod';
import { SendListCreateWithoutUserInputObjectSchema } from './SendListCreateWithoutUserInput.schema';
import { SendListUncheckedCreateWithoutUserInputObjectSchema } from './SendListUncheckedCreateWithoutUserInput.schema';
import { SendListCreateOrConnectWithoutUserInputObjectSchema } from './SendListCreateOrConnectWithoutUserInput.schema';
import { SendListCreateManyUserInputEnvelopeObjectSchema } from './SendListCreateManyUserInputEnvelope.schema';
import { SendListWhereUniqueInputObjectSchema } from './SendListWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListCreateNestedManyWithoutUserInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => SendListCreateWithoutUserInputObjectSchema),
        z.lazy(() => SendListCreateWithoutUserInputObjectSchema).array(),
        z.lazy(() => SendListUncheckedCreateWithoutUserInputObjectSchema),
        z
          .lazy(() => SendListUncheckedCreateWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => SendListCreateOrConnectWithoutUserInputObjectSchema),
        z
          .lazy(() => SendListCreateOrConnectWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => SendListCreateManyUserInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => SendListWhereUniqueInputObjectSchema),
        z.lazy(() => SendListWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const SendListCreateNestedManyWithoutUserInputObjectSchema = Schema;
