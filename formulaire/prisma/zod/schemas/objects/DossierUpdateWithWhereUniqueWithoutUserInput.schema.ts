import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithoutUserInputObjectSchema } from './DossierUpdateWithoutUserInput.schema';
import { DossierUncheckedUpdateWithoutUserInputObjectSchema } from './DossierUncheckedUpdateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdateWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
    data: z.union([
      z.lazy(() => DossierUpdateWithoutUserInputObjectSchema),
      z.lazy(() => DossierUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const DossierUpdateWithWhereUniqueWithoutUserInputObjectSchema = Schema;
