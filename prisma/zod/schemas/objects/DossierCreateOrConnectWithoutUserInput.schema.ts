import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierCreateWithoutUserInputObjectSchema } from './DossierCreateWithoutUserInput.schema';
import { DossierUncheckedCreateWithoutUserInputObjectSchema } from './DossierUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateOrConnectWithoutUserInput> = z
  .object({
    where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => DossierCreateWithoutUserInputObjectSchema),
      z.lazy(() => DossierUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const DossierCreateOrConnectWithoutUserInputObjectSchema = Schema;
