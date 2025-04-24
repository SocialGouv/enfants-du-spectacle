import { z } from 'zod';
import { PieceDossierEnfantWhereUniqueInputObjectSchema } from './PieceDossierEnfantWhereUniqueInput.schema';
import { PieceDossierEnfantUpdateWithoutEnfantInputObjectSchema } from './PieceDossierEnfantUpdateWithoutEnfantInput.schema';
import { PieceDossierEnfantUncheckedUpdateWithoutEnfantInputObjectSchema } from './PieceDossierEnfantUncheckedUpdateWithoutEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantUpdateWithWhereUniqueWithoutEnfantInput> =
  z
    .object({
      where: z.lazy(() => PieceDossierEnfantWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => PieceDossierEnfantUpdateWithoutEnfantInputObjectSchema),
        z.lazy(
          () => PieceDossierEnfantUncheckedUpdateWithoutEnfantInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const PieceDossierEnfantUpdateWithWhereUniqueWithoutEnfantInputObjectSchema =
  Schema;
