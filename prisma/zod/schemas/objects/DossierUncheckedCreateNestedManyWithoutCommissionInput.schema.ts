import { z } from 'zod';
import { DossierCreateWithoutCommissionInputObjectSchema } from './DossierCreateWithoutCommissionInput.schema';
import { DossierUncheckedCreateWithoutCommissionInputObjectSchema } from './DossierUncheckedCreateWithoutCommissionInput.schema';
import { DossierCreateOrConnectWithoutCommissionInputObjectSchema } from './DossierCreateOrConnectWithoutCommissionInput.schema';
import { DossierCreateManyCommissionInputEnvelopeObjectSchema } from './DossierCreateManyCommissionInputEnvelope.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUncheckedCreateNestedManyWithoutCommissionInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DossierCreateWithoutCommissionInputObjectSchema),
          z.lazy(() => DossierCreateWithoutCommissionInputObjectSchema).array(),
          z.lazy(
            () => DossierUncheckedCreateWithoutCommissionInputObjectSchema,
          ),
          z
            .lazy(
              () => DossierUncheckedCreateWithoutCommissionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => DossierCreateOrConnectWithoutCommissionInputObjectSchema,
          ),
          z
            .lazy(
              () => DossierCreateOrConnectWithoutCommissionInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => DossierCreateManyCommissionInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => DossierWhereUniqueInputObjectSchema),
          z.lazy(() => DossierWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const DossierUncheckedCreateNestedManyWithoutCommissionInputObjectSchema =
  Schema;
