import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsUpdateWithoutDossierInputObjectSchema } from './CommentsUpdateWithoutDossierInput.schema';
import { CommentsUncheckedUpdateWithoutDossierInputObjectSchema } from './CommentsUncheckedUpdateWithoutDossierInput.schema';
import { CommentsCreateWithoutDossierInputObjectSchema } from './CommentsCreateWithoutDossierInput.schema';
import { CommentsUncheckedCreateWithoutDossierInputObjectSchema } from './CommentsUncheckedCreateWithoutDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsUpsertWithWhereUniqueWithoutDossierInput> =
  z
    .object({
      where: z.lazy(() => CommentsWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => CommentsUpdateWithoutDossierInputObjectSchema),
        z.lazy(() => CommentsUncheckedUpdateWithoutDossierInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => CommentsCreateWithoutDossierInputObjectSchema),
        z.lazy(() => CommentsUncheckedCreateWithoutDossierInputObjectSchema),
      ]),
    })
    .strict();

export const CommentsUpsertWithWhereUniqueWithoutDossierInputObjectSchema =
  Schema;
