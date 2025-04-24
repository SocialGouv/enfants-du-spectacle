import { z } from 'zod';
import { CommentaireWhereUniqueInputObjectSchema } from './CommentaireWhereUniqueInput.schema';
import { CommentaireUpdateWithoutDossierInputObjectSchema } from './CommentaireUpdateWithoutDossierInput.schema';
import { CommentaireUncheckedUpdateWithoutDossierInputObjectSchema } from './CommentaireUncheckedUpdateWithoutDossierInput.schema';
import { CommentaireCreateWithoutDossierInputObjectSchema } from './CommentaireCreateWithoutDossierInput.schema';
import { CommentaireUncheckedCreateWithoutDossierInputObjectSchema } from './CommentaireUncheckedCreateWithoutDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireUpsertWithWhereUniqueWithoutDossierInput> =
  z
    .object({
      where: z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CommentaireUpdateWithoutDossierInputObjectSchema),
        z.lazy(() => CommentaireUncheckedUpdateWithoutDossierInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CommentaireCreateWithoutDossierInputObjectSchema),
        z.lazy(() => CommentaireUncheckedCreateWithoutDossierInputObjectSchema),
      ]),
    })
    .strict();

export const CommentaireUpsertWithWhereUniqueWithoutDossierInputObjectSchema =
  Schema;
