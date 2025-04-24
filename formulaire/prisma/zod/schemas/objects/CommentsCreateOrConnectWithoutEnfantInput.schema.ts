import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsCreateWithoutEnfantInputObjectSchema } from './CommentsCreateWithoutEnfantInput.schema';
import { CommentsUncheckedCreateWithoutEnfantInputObjectSchema } from './CommentsUncheckedCreateWithoutEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCreateOrConnectWithoutEnfantInput> = z
  .object({
    where: z.lazy(() => CommentsWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CommentsCreateWithoutEnfantInputObjectSchema),
      z.lazy(() => CommentsUncheckedCreateWithoutEnfantInputObjectSchema),
    ]),
  })
  .strict();

export const CommentsCreateOrConnectWithoutEnfantInputObjectSchema = Schema;
