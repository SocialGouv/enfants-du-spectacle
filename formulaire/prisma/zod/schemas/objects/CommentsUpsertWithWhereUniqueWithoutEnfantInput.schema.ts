import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsUpdateWithoutEnfantInputObjectSchema } from './CommentsUpdateWithoutEnfantInput.schema';
import { CommentsUncheckedUpdateWithoutEnfantInputObjectSchema } from './CommentsUncheckedUpdateWithoutEnfantInput.schema';
import { CommentsCreateWithoutEnfantInputObjectSchema } from './CommentsCreateWithoutEnfantInput.schema';
import { CommentsUncheckedCreateWithoutEnfantInputObjectSchema } from './CommentsUncheckedCreateWithoutEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUpsertWithWhereUniqueWithoutEnfantInput> =
  z
    .object({
      where: z.lazy(() => CommentsWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CommentsUpdateWithoutEnfantInputObjectSchema),
        z.lazy(() => CommentsUncheckedUpdateWithoutEnfantInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CommentsCreateWithoutEnfantInputObjectSchema),
        z.lazy(() => CommentsUncheckedCreateWithoutEnfantInputObjectSchema),
      ]),
    })
    .strict();

export const CommentsUpsertWithWhereUniqueWithoutEnfantInputObjectSchema =
  Schema;
