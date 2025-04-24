import { z } from 'zod';
import { CommissionUpdateWithoutDossiersInputObjectSchema } from './CommissionUpdateWithoutDossiersInput.schema';
import { CommissionUncheckedUpdateWithoutDossiersInputObjectSchema } from './CommissionUncheckedUpdateWithoutDossiersInput.schema';
import { CommissionCreateWithoutDossiersInputObjectSchema } from './CommissionCreateWithoutDossiersInput.schema';
import { CommissionUncheckedCreateWithoutDossiersInputObjectSchema } from './CommissionUncheckedCreateWithoutDossiersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommissionUpsertWithoutDossiersInput> = z
  .object({
    update: z.union([
      z.lazy(() => CommissionUpdateWithoutDossiersInputObjectSchema),
      z.lazy(() => CommissionUncheckedUpdateWithoutDossiersInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => CommissionCreateWithoutDossiersInputObjectSchema),
      z.lazy(() => CommissionUncheckedCreateWithoutDossiersInputObjectSchema),
    ]),
  })
  .strict();

export const CommissionUpsertWithoutDossiersInputObjectSchema = Schema;
