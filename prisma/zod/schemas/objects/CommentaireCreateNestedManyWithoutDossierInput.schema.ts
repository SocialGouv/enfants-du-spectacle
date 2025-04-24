import { z } from 'zod';
import { CommentaireCreateWithoutDossierInputObjectSchema } from './CommentaireCreateWithoutDossierInput.schema';
import { CommentaireUncheckedCreateWithoutDossierInputObjectSchema } from './CommentaireUncheckedCreateWithoutDossierInput.schema';
import { CommentaireCreateOrConnectWithoutDossierInputObjectSchema } from './CommentaireCreateOrConnectWithoutDossierInput.schema';
import { CommentaireCreateManyDossierInputEnvelopeObjectSchema } from './CommentaireCreateManyDossierInputEnvelope.schema';
import { CommentaireWhereUniqueInputObjectSchema } from './CommentaireWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireCreateNestedManyWithoutDossierInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentaireCreateWithoutDossierInputObjectSchema),
          z
            .lazy(() => CommentaireCreateWithoutDossierInputObjectSchema)
            .array(),
          z.lazy(
            () => CommentaireUncheckedCreateWithoutDossierInputObjectSchema,
          ),
          z
            .lazy(
              () => CommentaireUncheckedCreateWithoutDossierInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => CommentaireCreateOrConnectWithoutDossierInputObjectSchema,
          ),
          z
            .lazy(
              () => CommentaireCreateOrConnectWithoutDossierInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentaireCreateManyDossierInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentaireCreateNestedManyWithoutDossierInputObjectSchema =
  Schema;
