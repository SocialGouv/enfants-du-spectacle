import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithoutUserInputObjectSchema } from './DossierUpdateWithoutUserInput.schema';
import { DossierUncheckedUpdateWithoutUserInputObjectSchema } from './DossierUncheckedUpdateWithoutUserInput.schema';
import { DossierCreateWithoutUserInputObjectSchema } from './DossierCreateWithoutUserInput.schema';
import { DossierUncheckedCreateWithoutUserInputObjectSchema } from './DossierUncheckedCreateWithoutUserInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpsertWithWhereUniqueWithoutUserInput> = z
  .object({
    where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
    update: z.union([
      z.lazy(() => DossierUpdateWithoutUserInputObjectSchema),
      z.lazy(() => DossierUncheckedUpdateWithoutUserInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => DossierCreateWithoutUserInputObjectSchema),
      z.lazy(() => DossierUncheckedCreateWithoutUserInputObjectSchema),
    ]),
  })
  .strict();

export const DossierUpsertWithWhereUniqueWithoutUserInputObjectSchema = Schema;
