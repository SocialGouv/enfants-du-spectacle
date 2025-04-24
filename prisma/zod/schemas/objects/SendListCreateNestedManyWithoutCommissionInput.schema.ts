import { z } from 'zod';
import { SendListCreateWithoutCommissionInputObjectSchema } from './SendListCreateWithoutCommissionInput.schema';
import { SendListUncheckedCreateWithoutCommissionInputObjectSchema } from './SendListUncheckedCreateWithoutCommissionInput.schema';
import { SendListCreateOrConnectWithoutCommissionInputObjectSchema } from './SendListCreateOrConnectWithoutCommissionInput.schema';
import { SendListCreateManyCommissionInputEnvelopeObjectSchema } from './SendListCreateManyCommissionInputEnvelope.schema';
import { SendListWhereUniqueInputObjectSchema } from './SendListWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SendListCreateNestedManyWithoutCommissionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SendListCreateWithoutCommissionInputObjectSchema),
          z
            .lazy(() => SendListCreateWithoutCommissionInputObjectSchema)
            .array(),
          z.lazy(
            () => SendListUncheckedCreateWithoutCommissionInputObjectSchema,
          ),
          z
            .lazy(
              () => SendListUncheckedCreateWithoutCommissionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => SendListCreateOrConnectWithoutCommissionInputObjectSchema,
          ),
          z
            .lazy(
              () => SendListCreateOrConnectWithoutCommissionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SendListCreateManyCommissionInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => SendListWhereUniqueInputObjectSchema),
          z.lazy(() => SendListWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SendListCreateNestedManyWithoutCommissionInputObjectSchema =
  Schema;
