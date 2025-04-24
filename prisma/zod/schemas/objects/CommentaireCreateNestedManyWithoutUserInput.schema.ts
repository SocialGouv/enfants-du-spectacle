import { z } from 'zod';
import { CommentaireCreateWithoutUserInputObjectSchema } from './CommentaireCreateWithoutUserInput.schema';
import { CommentaireUncheckedCreateWithoutUserInputObjectSchema } from './CommentaireUncheckedCreateWithoutUserInput.schema';
import { CommentaireCreateOrConnectWithoutUserInputObjectSchema } from './CommentaireCreateOrConnectWithoutUserInput.schema';
import { CommentaireCreateManyUserInputEnvelopeObjectSchema } from './CommentaireCreateManyUserInputEnvelope.schema';
import { CommentaireWhereUniqueInputObjectSchema } from './CommentaireWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentaireCreateNestedManyWithoutUserInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => CommentaireCreateWithoutUserInputObjectSchema),
        z.lazy(() => CommentaireCreateWithoutUserInputObjectSchema).array(),
        z.lazy(() => CommentaireUncheckedCreateWithoutUserInputObjectSchema),
        z
          .lazy(() => CommentaireUncheckedCreateWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => CommentaireCreateOrConnectWithoutUserInputObjectSchema),
        z
          .lazy(() => CommentaireCreateOrConnectWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => CommentaireCreateManyUserInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => CommentaireWhereUniqueInputObjectSchema),
        z.lazy(() => CommentaireWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const CommentaireCreateNestedManyWithoutUserInputObjectSchema = Schema;
