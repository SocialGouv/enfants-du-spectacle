import { z } from 'zod';
import { CommentsCreateWithoutDossierInputObjectSchema } from './CommentsCreateWithoutDossierInput.schema';
import { CommentsUncheckedCreateWithoutDossierInputObjectSchema } from './CommentsUncheckedCreateWithoutDossierInput.schema';
import { CommentsCreateOrConnectWithoutDossierInputObjectSchema } from './CommentsCreateOrConnectWithoutDossierInput.schema';
import { CommentsCreateManyDossierInputEnvelopeObjectSchema } from './CommentsCreateManyDossierInputEnvelope.schema';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUncheckedCreateNestedManyWithoutDossierInput> =
  z
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
      createMany: z
        .lazy(() => CommentsCreateManyDossierInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentsWhereUniqueInputObjectSchema),
          z.lazy(() => CommentsWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentsUncheckedCreateNestedManyWithoutDossierInputObjectSchema =
  Schema;
