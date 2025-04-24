import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsUpdateWithoutDossierInputObjectSchema } from './CommentsUpdateWithoutDossierInput.schema';
import { CommentsUncheckedUpdateWithoutDossierInputObjectSchema } from './CommentsUncheckedUpdateWithoutDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUpdateWithWhereUniqueWithoutDossierInput> =
  z
    .object({
      where: z.lazy(() => CommentsWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => CommentsUpdateWithoutDossierInputObjectSchema),
        z.lazy(() => CommentsUncheckedUpdateWithoutDossierInputObjectSchema),
      ]),
    })
    .strict();

export const CommentsUpdateWithWhereUniqueWithoutDossierInputObjectSchema =
  Schema;
