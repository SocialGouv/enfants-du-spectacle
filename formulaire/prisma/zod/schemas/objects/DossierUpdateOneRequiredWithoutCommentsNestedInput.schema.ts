import { z } from 'zod';
import { DossierCreateWithoutCommentsInputObjectSchema } from './DossierCreateWithoutCommentsInput.schema';
import { DossierUncheckedCreateWithoutCommentsInputObjectSchema } from './DossierUncheckedCreateWithoutCommentsInput.schema';
import { DossierCreateOrConnectWithoutCommentsInputObjectSchema } from './DossierCreateOrConnectWithoutCommentsInput.schema';
import { DossierUpsertWithoutCommentsInputObjectSchema } from './DossierUpsertWithoutCommentsInput.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithoutCommentsInputObjectSchema } from './DossierUpdateWithoutCommentsInput.schema';
import { DossierUncheckedUpdateWithoutCommentsInputObjectSchema } from './DossierUncheckedUpdateWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdateOneRequiredWithoutCommentsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DossierCreateWithoutCommentsInputObjectSchema),
          z.lazy(() => DossierUncheckedCreateWithoutCommentsInputObjectSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DossierCreateOrConnectWithoutCommentsInputObjectSchema)
        .optional(),
      upsert: z
        .lazy(() => DossierUpsertWithoutCommentsInputObjectSchema)
        .optional(),
      connect: z.lazy(() => DossierWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => DossierUpdateWithoutCommentsInputObjectSchema),
          z.lazy(() => DossierUncheckedUpdateWithoutCommentsInputObjectSchema),
        ])
        .optional(),
    })
    .strict();

export const DossierUpdateOneRequiredWithoutCommentsNestedInputObjectSchema =
  Schema;
