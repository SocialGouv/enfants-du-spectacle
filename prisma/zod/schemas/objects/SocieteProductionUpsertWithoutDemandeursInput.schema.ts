import { z } from 'zod';
import { SocieteProductionUpdateWithoutDemandeursInputObjectSchema } from './SocieteProductionUpdateWithoutDemandeursInput.schema';
import { SocieteProductionUncheckedUpdateWithoutDemandeursInputObjectSchema } from './SocieteProductionUncheckedUpdateWithoutDemandeursInput.schema';
import { SocieteProductionCreateWithoutDemandeursInputObjectSchema } from './SocieteProductionCreateWithoutDemandeursInput.schema';
import { SocieteProductionUncheckedCreateWithoutDemandeursInputObjectSchema } from './SocieteProductionUncheckedCreateWithoutDemandeursInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SocieteProductionUpsertWithoutDemandeursInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => SocieteProductionUpdateWithoutDemandeursInputObjectSchema),
        z.lazy(
          () =>
            SocieteProductionUncheckedUpdateWithoutDemandeursInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => SocieteProductionCreateWithoutDemandeursInputObjectSchema),
        z.lazy(
          () =>
            SocieteProductionUncheckedCreateWithoutDemandeursInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const SocieteProductionUpsertWithoutDemandeursInputObjectSchema = Schema;
