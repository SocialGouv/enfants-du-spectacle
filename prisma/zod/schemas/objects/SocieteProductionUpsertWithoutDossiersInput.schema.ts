import { z } from 'zod';
import { SocieteProductionUpdateWithoutDossiersInputObjectSchema } from './SocieteProductionUpdateWithoutDossiersInput.schema';
import { SocieteProductionUncheckedUpdateWithoutDossiersInputObjectSchema } from './SocieteProductionUncheckedUpdateWithoutDossiersInput.schema';
import { SocieteProductionCreateWithoutDossiersInputObjectSchema } from './SocieteProductionCreateWithoutDossiersInput.schema';
import { SocieteProductionUncheckedCreateWithoutDossiersInputObjectSchema } from './SocieteProductionUncheckedCreateWithoutDossiersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionUpsertWithoutDossiersInput> = z
  .object({
    update: z.union([
      z.lazy(() => SocieteProductionUpdateWithoutDossiersInputObjectSchema),
      z.lazy(
        () => SocieteProductionUncheckedUpdateWithoutDossiersInputObjectSchema,
      ),
    ]),
    create: z.union([
      z.lazy(() => SocieteProductionCreateWithoutDossiersInputObjectSchema),
      z.lazy(
        () => SocieteProductionUncheckedCreateWithoutDossiersInputObjectSchema,
      ),
    ]),
  })
  .strict();

export const SocieteProductionUpsertWithoutDossiersInputObjectSchema = Schema;
