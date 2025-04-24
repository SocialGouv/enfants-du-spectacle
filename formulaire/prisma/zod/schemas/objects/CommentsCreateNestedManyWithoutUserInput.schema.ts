import { z } from 'zod';
import { CommentsCreateWithoutUserInputObjectSchema } from './CommentsCreateWithoutUserInput.schema';
import { CommentsUncheckedCreateWithoutUserInputObjectSchema } from './CommentsUncheckedCreateWithoutUserInput.schema';
import { CommentsCreateOrConnectWithoutUserInputObjectSchema } from './CommentsCreateOrConnectWithoutUserInput.schema';
import { CommentsCreateManyUserInputEnvelopeObjectSchema } from './CommentsCreateManyUserInputEnvelope.schema';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCreateNestedManyWithoutUserInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => CommentsCreateWithoutUserInputObjectSchema),
        z.lazy(() => CommentsCreateWithoutUserInputObjectSchema).array(),
        z.lazy(() => CommentsUncheckedCreateWithoutUserInputObjectSchema),
        z
          .lazy(() => CommentsUncheckedCreateWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => CommentsCreateOrConnectWithoutUserInputObjectSchema),
        z
          .lazy(() => CommentsCreateOrConnectWithoutUserInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => CommentsCreateManyUserInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => CommentsWhereUniqueInputObjectSchema),
        z.lazy(() => CommentsWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const CommentsCreateNestedManyWithoutUserInputObjectSchema = Schema;
