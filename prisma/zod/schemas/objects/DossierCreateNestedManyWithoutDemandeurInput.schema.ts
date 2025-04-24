import { z } from 'zod';
import { DossierCreateWithoutDemandeurInputObjectSchema } from './DossierCreateWithoutDemandeurInput.schema';
import { DossierUncheckedCreateWithoutDemandeurInputObjectSchema } from './DossierUncheckedCreateWithoutDemandeurInput.schema';
import { DossierCreateOrConnectWithoutDemandeurInputObjectSchema } from './DossierCreateOrConnectWithoutDemandeurInput.schema';
import { DossierCreateManyDemandeurInputEnvelopeObjectSchema } from './DossierCreateManyDemandeurInputEnvelope.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateNestedManyWithoutDemandeurInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => DossierCreateWithoutDemandeurInputObjectSchema),
        z.lazy(() => DossierCreateWithoutDemandeurInputObjectSchema).array(),
        z.lazy(() => DossierUncheckedCreateWithoutDemandeurInputObjectSchema),
        z
          .lazy(() => DossierUncheckedCreateWithoutDemandeurInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => DossierCreateOrConnectWithoutDemandeurInputObjectSchema),
        z
          .lazy(() => DossierCreateOrConnectWithoutDemandeurInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => DossierCreateManyDemandeurInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => DossierWhereUniqueInputObjectSchema),
        z.lazy(() => DossierWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const DossierCreateNestedManyWithoutDemandeurInputObjectSchema = Schema;
