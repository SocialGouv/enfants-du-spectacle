import { z } from 'zod';
import { DemandeurUpdateWithoutDossiersInputObjectSchema } from './DemandeurUpdateWithoutDossiersInput.schema';
import { DemandeurUncheckedUpdateWithoutDossiersInputObjectSchema } from './DemandeurUncheckedUpdateWithoutDossiersInput.schema';
import { DemandeurCreateWithoutDossiersInputObjectSchema } from './DemandeurCreateWithoutDossiersInput.schema';
import { DemandeurUncheckedCreateWithoutDossiersInputObjectSchema } from './DemandeurUncheckedCreateWithoutDossiersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DemandeurUpsertWithoutDossiersInput> = z
  .object({
    update: z.union([
      z.lazy(() => DemandeurUpdateWithoutDossiersInputObjectSchema),
      z.lazy(() => DemandeurUncheckedUpdateWithoutDossiersInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => DemandeurCreateWithoutDossiersInputObjectSchema),
      z.lazy(() => DemandeurUncheckedCreateWithoutDossiersInputObjectSchema),
    ]),
  })
  .strict();

export const DemandeurUpsertWithoutDossiersInputObjectSchema = Schema;
