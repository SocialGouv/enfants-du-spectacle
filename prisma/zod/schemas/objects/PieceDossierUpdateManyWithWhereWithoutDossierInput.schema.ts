import { z } from 'zod';
import { PieceDossierScalarWhereInputObjectSchema } from './PieceDossierScalarWhereInput.schema';
import { PieceDossierUpdateManyMutationInputObjectSchema } from './PieceDossierUpdateManyMutationInput.schema';
import { PieceDossierUncheckedUpdateManyWithoutPiecesDossierInputObjectSchema } from './PieceDossierUncheckedUpdateManyWithoutPiecesDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierUpdateManyWithWhereWithoutDossierInput> =
  z
    .object({
      where: z.lazy(() => PieceDossierScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => PieceDossierUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            PieceDossierUncheckedUpdateManyWithoutPiecesDossierInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const PieceDossierUpdateManyWithWhereWithoutDossierInputObjectSchema =
  Schema;
