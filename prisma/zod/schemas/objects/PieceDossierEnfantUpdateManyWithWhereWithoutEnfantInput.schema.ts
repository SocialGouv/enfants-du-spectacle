import { z } from 'zod';
import { PieceDossierEnfantScalarWhereInputObjectSchema } from './PieceDossierEnfantScalarWhereInput.schema';
import { PieceDossierEnfantUpdateManyMutationInputObjectSchema } from './PieceDossierEnfantUpdateManyMutationInput.schema';
import { PieceDossierEnfantUncheckedUpdateManyWithoutPiecesDossierInputObjectSchema } from './PieceDossierEnfantUncheckedUpdateManyWithoutPiecesDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantUpdateManyWithWhereWithoutEnfantInput> =
  z
    .object({
      where: z.lazy(() => PieceDossierEnfantScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => PieceDossierEnfantUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            PieceDossierEnfantUncheckedUpdateManyWithoutPiecesDossierInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const PieceDossierEnfantUpdateManyWithWhereWithoutEnfantInputObjectSchema =
  Schema;
