import { z } from 'zod';
import { CommentaireCreateWithoutDossierInputObjectSchema } from './CommentaireCreateWithoutDossierInput.schema';
import { CommentaireUncheckedCreateWithoutDossierInputObjectSchema } from './CommentaireUncheckedCreateWithoutDossierInput.schema';
import { CommentaireCreateOrConnectWithoutDossierInputObjectSchema } from './CommentaireCreateOrConnectWithoutDossierInput.schema';
import { CommentaireUpsertWithWhereUniqueWithoutDossierInputObjectSchema } from './CommentaireUpsertWithWhereUniqueWithoutDossierInput.schema';
import { CommentaireCreateManyDossierInputEnvelopeObjectSchema } from './CommentaireCreateManyDossierInputEnvelope.schema';
import { CommentaireWhereUniqueInputObjectSchema } from './CommentaireWhereUniqueInput.schema';
import { CommentaireUpdateWithWhereUniqueWithoutDossierInputObjectSchema } from './CommentaireUpdateWithWhereUniqueWithoutDossierInput.schema';
import { CommentaireUpdateManyWithWhereWithoutDossierInputObjectSchema } from './CommentaireUpdateManyWithWhereWithoutDossierInput.schema';
import { CommentaireScalarWhereInputObjectSchema } from './CommentaireScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireUpdateManyWithoutDossierNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () =>
              CommentaireUpsertWithWhereUniqueWithoutDossierInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CommentaireUpsertWithWhereUniqueWithoutDossierInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentaireCreateManyDossierInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
          z.lazy(() => CommentaireWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              CommentaireUpdateWithWhereUniqueWithoutDossierInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CommentaireUpdateWithWhereUniqueWithoutDossierInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => CommentaireUpdateManyWithWhereWithoutDossierInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                CommentaireUpdateManyWithWhereWithoutDossierInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => CommentaireScalarWhereInputObjectSchema),
          z.lazy(() => CommentaireScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentaireUpdateManyWithoutDossierNestedInputObjectSchema =
  Schema;
