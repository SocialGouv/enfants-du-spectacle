import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierCreateWithoutCommentsInputObjectSchema } from './DossierCreateWithoutCommentsInput.schema';
import { DossierUncheckedCreateWithoutCommentsInputObjectSchema } from './DossierUncheckedCreateWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateOrConnectWithoutCommentsInput> = z
  .object({
    where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => DossierCreateWithoutCommentsInputObjectSchema),
      z.lazy(() => DossierUncheckedCreateWithoutCommentsInputObjectSchema),
    ]),
  })
  .strict();

export const DossierCreateOrConnectWithoutCommentsInputObjectSchema = Schema;
