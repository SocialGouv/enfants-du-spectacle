import { z } from 'zod';
import { DossierCreateWithoutUserInputObjectSchema } from './DossierCreateWithoutUserInput.schema';
import { DossierUncheckedCreateWithoutUserInputObjectSchema } from './DossierUncheckedCreateWithoutUserInput.schema';
import { DossierCreateOrConnectWithoutUserInputObjectSchema } from './DossierCreateOrConnectWithoutUserInput.schema';
import { DossierCreateManyUserInputEnvelopeObjectSchema } from './DossierCreateManyUserInputEnvelope.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateNestedManyWithoutUserInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => DossierCreateWithoutUserInputObjectSchema),
        z.lazy(() => DossierCreateWithoutUserInputObjectSchema).array(),
        z.lazy(() => DossierUncheckedCreateWithoutUserInputObjectSchema),
        z
          .lazy(() => DossierUncheckedCreateWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => DossierCreateOrConnectWithoutUserInputObjectSchema),
        z
          .lazy(() => DossierCreateOrConnectWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => DossierCreateManyUserInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => DossierWhereUniqueInputObjectSchema),
        z.lazy(() => DossierWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const DossierCreateNestedManyWithoutUserInputObjectSchema = Schema;
