import { z } from 'zod';
import { CommentaireWhereUniqueInputObjectSchema } from './CommentaireWhereUniqueInput.schema';
import { CommentaireUpdateWithoutDossierInputObjectSchema } from './CommentaireUpdateWithoutDossierInput.schema';
import { CommentaireUncheckedUpdateWithoutDossierInputObjectSchema } from './CommentaireUncheckedUpdateWithoutDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireUpdateWithWhereUniqueWithoutDossierInput> =
  z
    .object({
      where: z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CommentaireUpdateWithoutDossierInputObjectSchema),
        z.lazy(() => CommentaireUncheckedUpdateWithoutDossierInputObjectSchema),
      ]),
    })
    .strict();

export const CommentaireUpdateWithWhereUniqueWithoutDossierInputObjectSchema =
  Schema;
