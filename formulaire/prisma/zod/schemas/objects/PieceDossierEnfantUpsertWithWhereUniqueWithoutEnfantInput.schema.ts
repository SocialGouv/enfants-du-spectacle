import { z } from 'zod';
import { PieceDossierEnfantWhereUniqueInputObjectSchema } from './PieceDossierEnfantWhereUniqueInput.schema';
import { PieceDossierEnfantUpdateWithoutEnfantInputObjectSchema } from './PieceDossierEnfantUpdateWithoutEnfantInput.schema';
import { PieceDossierEnfantUncheckedUpdateWithoutEnfantInputObjectSchema } from './PieceDossierEnfantUncheckedUpdateWithoutEnfantInput.schema';
import { PieceDossierEnfantCreateWithoutEnfantInputObjectSchema } from './PieceDossierEnfantCreateWithoutEnfantInput.schema';
import { PieceDossierEnfantUncheckedCreateWithoutEnfantInputObjectSchema } from './PieceDossierEnfantUncheckedCreateWithoutEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantUpsertWithWhereUniqueWithoutEnfantInput> =
  z
    .object({
      where: z.lazy(() => PieceDossierEnfantWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => PieceDossierEnfantUpdateWithoutEnfantInputObjectSchema),
        z.lazy(
          () => PieceDossierEnfantUncheckedUpdateWithoutEnfantInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(() => PieceDossierEnfantCreateWithoutEnfantInputObjectSchema),
        z.lazy(
          () => PieceDossierEnfantUncheckedCreateWithoutEnfantInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const PieceDossierEnfantUpsertWithWhereUniqueWithoutEnfantInputObjectSchema =
  Schema;
