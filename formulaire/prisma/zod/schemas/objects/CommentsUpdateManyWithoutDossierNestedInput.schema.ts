import { z } from 'zod';
import { CommentsCreateWithoutDossierInputObjectSchema } from './CommentsCreateWithoutDossierInput.schema';
import { CommentsUncheckedCreateWithoutDossierInputObjectSchema } from './CommentsUncheckedCreateWithoutDossierInput.schema';
import { CommentsCreateOrConnectWithoutDossierInputObjectSchema } from './CommentsCreateOrConnectWithoutDossierInput.schema';
import { CommentsUpsertWithWhereUniqueWithoutDossierInputObjectSchema } from './CommentsUpsertWithWhereUniqueWithoutDossierInput.schema';
import { CommentsCreateManyDossierInputEnvelopeObjectSchema } from './CommentsCreateManyDossierInputEnvelope.schema';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsUpdateWithWhereUniqueWithoutDossierInputObjectSchema } from './CommentsUpdateWithWhereUniqueWithoutDossierInput.schema';
import { CommentsUpdateManyWithWhereWithoutDossierInputObjectSchema } from './CommentsUpdateManyWithWhereWithoutDossierInput.schema';
import { CommentsScalarWhereInputObjectSchema } from './CommentsScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUpdateManyWithoutDossierNestedInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => CommentsCreateWithoutDossierInputObjectSchema),
        z.lazy(() => CommentsCreateWithoutDossierInputObjectSchema).array(),
        z.lazy(() => CommentsUncheckedCreateWithoutDossierInputObjectSchema),
        z
          .lazy(() => CommentsUncheckedCreateWithoutDossierInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => CommentsCreateOrConnectWithoutDossierInputObjectSchema),
        z
          .lazy(() => CommentsCreateOrConnectWithoutDossierInputObjectSchema)
          .array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(
          () => CommentsUpsertWithWhereUniqueWithoutDossierInputObjectSchema,
        ),
        z
          .lazy(
            () => CommentsUpsertWithWhereUniqueWithoutDossierInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => CommentsCreateManyDossierInputEnvelopeObjectSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => CommentsWhereUniqueInputObjectSchema),
        z.lazy(() => CommentsWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => CommentsWhereUniqueInputObjectSchema),
        z.lazy(() => CommentsWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => CommentsWhereUniqueInputObjectSchema),
        z.lazy(() => CommentsWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => CommentsWhereUniqueInputObjectSchema),
        z.lazy(() => CommentsWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(
          () => CommentsUpdateWithWhereUniqueWithoutDossierInputObjectSchema,
        ),
        z
          .lazy(
            () => CommentsUpdateWithWhereUniqueWithoutDossierInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(
          () => CommentsUpdateManyWithWhereWithoutDossierInputObjectSchema,
        ),
        z
          .lazy(
            () => CommentsUpdateManyWithWhereWithoutDossierInputObjectSchema,
          )
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => CommentsScalarWhereInputObjectSchema),
        z.lazy(() => CommentsScalarWhereInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const CommentsUpdateManyWithoutDossierNestedInputObjectSchema = Schema;
