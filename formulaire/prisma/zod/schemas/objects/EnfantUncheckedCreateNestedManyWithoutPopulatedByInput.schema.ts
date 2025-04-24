import { z } from 'zod';
import { EnfantCreateWithoutPopulatedByInputObjectSchema } from './EnfantCreateWithoutPopulatedByInput.schema';
import { EnfantUncheckedCreateWithoutPopulatedByInputObjectSchema } from './EnfantUncheckedCreateWithoutPopulatedByInput.schema';
import { EnfantCreateOrConnectWithoutPopulatedByInputObjectSchema } from './EnfantCreateOrConnectWithoutPopulatedByInput.schema';
import { EnfantCreateManyPopulatedByInputEnvelopeObjectSchema } from './EnfantCreateManyPopulatedByInputEnvelope.schema';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUncheckedCreateNestedManyWithoutPopulatedByInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => EnfantCreateWithoutPopulatedByInputObjectSchema),
          z.lazy(() => EnfantCreateWithoutPopulatedByInputObjectSchema).array(),
          z.lazy(
            () => EnfantUncheckedCreateWithoutPopulatedByInputObjectSchema,
          ),
          z
            .lazy(
              () => EnfantUncheckedCreateWithoutPopulatedByInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => EnfantCreateOrConnectWithoutPopulatedByInputObjectSchema,
          ),
          z
            .lazy(
              () => EnfantCreateOrConnectWithoutPopulatedByInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => EnfantCreateManyPopulatedByInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => EnfantWhereUniqueInputObjectSchema),
          z.lazy(() => EnfantWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const EnfantUncheckedCreateNestedManyWithoutPopulatedByInputObjectSchema =
  Schema;
