import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsUpdateWithoutEnfantInputObjectSchema } from './CommentsUpdateWithoutEnfantInput.schema';
import { CommentsUncheckedUpdateWithoutEnfantInputObjectSchema } from './CommentsUncheckedUpdateWithoutEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUpdateWithWhereUniqueWithoutEnfantInput> =
  z
    .object({
      where: z.lazy(() => CommentsWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CommentsUpdateWithoutEnfantInputObjectSchema),
        z.lazy(() => CommentsUncheckedUpdateWithoutEnfantInputObjectSchema),
      ]),
    })
    .strict();

export const CommentsUpdateWithWhereUniqueWithoutEnfantInputObjectSchema =
  Schema;
