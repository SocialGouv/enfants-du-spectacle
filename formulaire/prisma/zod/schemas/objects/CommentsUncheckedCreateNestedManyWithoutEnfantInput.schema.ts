import { z } from 'zod';
import { CommentsCreateWithoutEnfantInputObjectSchema } from './CommentsCreateWithoutEnfantInput.schema';
import { CommentsUncheckedCreateWithoutEnfantInputObjectSchema } from './CommentsUncheckedCreateWithoutEnfantInput.schema';
import { CommentsCreateOrConnectWithoutEnfantInputObjectSchema } from './CommentsCreateOrConnectWithoutEnfantInput.schema';
import { CommentsCreateManyEnfantInputEnvelopeObjectSchema } from './CommentsCreateManyEnfantInputEnvelope.schema';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUncheckedCreateNestedManyWithoutEnfantInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => CommentsCreateWithoutEnfantInputObjectSchema),
          z.lazy(() => CommentsCreateWithoutEnfantInputObjectSchema).array(),
          z.lazy(() => CommentsUncheckedCreateWithoutEnfantInputObjectSchema),
          z
            .lazy(() => CommentsUncheckedCreateWithoutEnfantInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => CommentsCreateOrConnectWithoutEnfantInputObjectSchema),
          z
            .lazy(() => CommentsCreateOrConnectWithoutEnfantInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => CommentsCreateManyEnfantInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => CommentsWhereUniqueInputObjectSchema),
          z.lazy(() => CommentsWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const CommentsUncheckedCreateNestedManyWithoutEnfantInputObjectSchema =
  Schema;
