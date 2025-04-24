import { z } from 'zod';
import { CommentsScalarWhereInputObjectSchema } from './CommentsScalarWhereInput.schema';
import { CommentsUpdateManyMutationInputObjectSchema } from './CommentsUpdateManyMutationInput.schema';
import { CommentsUncheckedUpdateManyWithoutCommentsInputObjectSchema } from './CommentsUncheckedUpdateManyWithoutCommentsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUpdateManyWithWhereWithoutDossierInput> =
  z
    .object({
      where: z.lazy(() => CommentsScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => CommentsUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => CommentsUncheckedUpdateManyWithoutCommentsInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const CommentsUpdateManyWithWhereWithoutDossierInputObjectSchema =
  Schema;
