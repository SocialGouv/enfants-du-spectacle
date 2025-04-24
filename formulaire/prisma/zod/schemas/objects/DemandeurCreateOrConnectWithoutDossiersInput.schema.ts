import { z } from 'zod';
import { DemandeurWhereUniqueInputObjectSchema } from './DemandeurWhereUniqueInput.schema';
import { DemandeurCreateWithoutDossiersInputObjectSchema } from './DemandeurCreateWithoutDossiersInput.schema';
import { DemandeurUncheckedCreateWithoutDossiersInputObjectSchema } from './DemandeurUncheckedCreateWithoutDossiersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurCreateOrConnectWithoutDossiersInput> = z
  .object({
    where: z.lazy(() => DemandeurWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => DemandeurCreateWithoutDossiersInputObjectSchema),
      z.lazy(() => DemandeurUncheckedCreateWithoutDossiersInputObjectSchema),
    ]),
  })
  .strict();

export const DemandeurCreateOrConnectWithoutDossiersInputObjectSchema = Schema;
