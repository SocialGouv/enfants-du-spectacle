import { z } from 'zod';
import { SocieteProductionUpdateWithoutDemandeurInputObjectSchema } from './SocieteProductionUpdateWithoutDemandeurInput.schema';
import { SocieteProductionUncheckedUpdateWithoutDemandeurInputObjectSchema } from './SocieteProductionUncheckedUpdateWithoutDemandeurInput.schema';
import { SocieteProductionCreateWithoutDemandeurInputObjectSchema } from './SocieteProductionCreateWithoutDemandeurInput.schema';
import { SocieteProductionUncheckedCreateWithoutDemandeurInputObjectSchema } from './SocieteProductionUncheckedCreateWithoutDemandeurInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionUpsertWithoutDemandeurInput> = z
  .object({
    update: z.union([
      z.lazy(() => SocieteProductionUpdateWithoutDemandeurInputObjectSchema),
      z.lazy(
        () => SocieteProductionUncheckedUpdateWithoutDemandeurInputObjectSchema,
      ),
    ]),
    create: z.union([
      z.lazy(() => SocieteProductionCreateWithoutDemandeurInputObjectSchema),
      z.lazy(
        () => SocieteProductionUncheckedCreateWithoutDemandeurInputObjectSchema,
      ),
    ]),
  })
  .strict();

export const SocieteProductionUpsertWithoutDemandeurInputObjectSchema = Schema;
