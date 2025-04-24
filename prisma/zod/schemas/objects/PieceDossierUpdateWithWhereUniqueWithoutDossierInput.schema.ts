import { z } from 'zod';
import { PieceDossierWhereUniqueInputObjectSchema } from './PieceDossierWhereUniqueInput.schema';
import { PieceDossierUpdateWithoutDossierInputObjectSchema } from './PieceDossierUpdateWithoutDossierInput.schema';
import { PieceDossierUncheckedUpdateWithoutDossierInputObjectSchema } from './PieceDossierUncheckedUpdateWithoutDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierUpdateWithWhereUniqueWithoutDossierInput> =
  z
    .object({
      where: z.lazy(() => PieceDossierWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => PieceDossierUpdateWithoutDossierInputObjectSchema),
        z.lazy(
          () => PieceDossierUncheckedUpdateWithoutDossierInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const PieceDossierUpdateWithWhereUniqueWithoutDossierInputObjectSchema =
  Schema;
