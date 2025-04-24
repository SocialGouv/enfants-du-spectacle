import { z } from 'zod';
import { CommentaireWhereUniqueInputObjectSchema } from './CommentaireWhereUniqueInput.schema';
import { CommentaireCreateWithoutDossierInputObjectSchema } from './CommentaireCreateWithoutDossierInput.schema';
import { CommentaireUncheckedCreateWithoutDossierInputObjectSchema } from './CommentaireUncheckedCreateWithoutDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireCreateOrConnectWithoutDossierInput> =
  z
    .object({
      where: z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => CommentaireCreateWithoutDossierInputObjectSchema),
        z.lazy(() => CommentaireUncheckedCreateWithoutDossierInputObjectSchema),
      ]),
    })
    .strict();

export const CommentaireCreateOrConnectWithoutDossierInputObjectSchema = Schema;
