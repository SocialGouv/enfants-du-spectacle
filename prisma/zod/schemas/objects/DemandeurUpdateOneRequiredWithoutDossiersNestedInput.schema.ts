import { z } from 'zod';
import { DemandeurCreateWithoutDossiersInputObjectSchema } from './DemandeurCreateWithoutDossiersInput.schema';
import { DemandeurUncheckedCreateWithoutDossiersInputObjectSchema } from './DemandeurUncheckedCreateWithoutDossiersInput.schema';
import { DemandeurCreateOrConnectWithoutDossiersInputObjectSchema } from './DemandeurCreateOrConnectWithoutDossiersInput.schema';
import { DemandeurUpsertWithoutDossiersInputObjectSchema } from './DemandeurUpsertWithoutDossiersInput.schema';
import { DemandeurWhereUniqueInputObjectSchema } from './DemandeurWhereUniqueInput.schema';
import { DemandeurUpdateWithoutDossiersInputObjectSchema } from './DemandeurUpdateWithoutDossiersInput.schema';
import { DemandeurUncheckedUpdateWithoutDossiersInputObjectSchema } from './DemandeurUncheckedUpdateWithoutDossiersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUpdateOneRequiredWithoutDossiersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DemandeurCreateWithoutDossiersInputObjectSchema),
          z.lazy(
            () => DemandeurUncheckedCreateWithoutDossiersInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DemandeurCreateOrConnectWithoutDossiersInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => DemandeurUpsertWithoutDossiersInputObjectSchema)
        .optional(),
      connect: z.lazy(() => DemandeurWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => DemandeurUpdateWithoutDossiersInputObjectSchema),
          z.lazy(
            () => DemandeurUncheckedUpdateWithoutDossiersInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const DemandeurUpdateOneRequiredWithoutDossiersNestedInputObjectSchema =
  Schema;
