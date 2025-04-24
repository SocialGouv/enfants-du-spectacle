import { z } from 'zod';
import { DossierCreateWithoutEnfantsInputObjectSchema } from './DossierCreateWithoutEnfantsInput.schema';
import { DossierUncheckedCreateWithoutEnfantsInputObjectSchema } from './DossierUncheckedCreateWithoutEnfantsInput.schema';
import { DossierCreateOrConnectWithoutEnfantsInputObjectSchema } from './DossierCreateOrConnectWithoutEnfantsInput.schema';
import { DossierUpsertWithoutEnfantsInputObjectSchema } from './DossierUpsertWithoutEnfantsInput.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithoutEnfantsInputObjectSchema } from './DossierUpdateWithoutEnfantsInput.schema';
import { DossierUncheckedUpdateWithoutEnfantsInputObjectSchema } from './DossierUncheckedUpdateWithoutEnfantsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdateOneRequiredWithoutEnfantsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DossierCreateWithoutEnfantsInputObjectSchema),
          z.lazy(() => DossierUncheckedCreateWithoutEnfantsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DossierCreateOrConnectWithoutEnfantsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => DossierUpsertWithoutEnfantsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => DossierWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => DossierUpdateWithoutEnfantsInputObjectSchema),
          z.lazy(() => DossierUncheckedUpdateWithoutEnfantsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const DossierUpdateOneRequiredWithoutEnfantsNestedInputObjectSchema =
  Schema;
