import { z } from 'zod';
import { DossierCreateWithoutCommentsInputObjectSchema } from './DossierCreateWithoutCommentsInput.schema';
import { DossierUncheckedCreateWithoutCommentsInputObjectSchema } from './DossierUncheckedCreateWithoutCommentsInput.schema';
import { DossierCreateOrConnectWithoutCommentsInputObjectSchema } from './DossierCreateOrConnectWithoutCommentsInput.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateNestedOneWithoutCommentsInput> = z
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
    connect: z.lazy(() => DossierWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const DossierCreateNestedOneWithoutCommentsInputObjectSchema = Schema;
