import { z } from 'zod';
import { DemandeurCreateWithoutDossiersInputObjectSchema } from './DemandeurCreateWithoutDossiersInput.schema';
import { DemandeurUncheckedCreateWithoutDossiersInputObjectSchema } from './DemandeurUncheckedCreateWithoutDossiersInput.schema';
import { DemandeurCreateOrConnectWithoutDossiersInputObjectSchema } from './DemandeurCreateOrConnectWithoutDossiersInput.schema';
import { DemandeurWhereUniqueInputObjectSchema } from './DemandeurWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurCreateNestedOneWithoutDossiersInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => DemandeurCreateWithoutDossiersInputObjectSchema),
        z.lazy(() => DemandeurUncheckedCreateWithoutDossiersInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => DemandeurCreateOrConnectWithoutDossiersInputObjectSchema)
      .optional(),
    connect: z.lazy(() => DemandeurWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const DemandeurCreateNestedOneWithoutDossiersInputObjectSchema = Schema;
