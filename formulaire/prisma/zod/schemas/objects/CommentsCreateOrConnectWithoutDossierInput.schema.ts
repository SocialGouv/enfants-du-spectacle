import { z } from 'zod';
import { CommentsWhereUniqueInputObjectSchema } from './CommentsWhereUniqueInput.schema';
import { CommentsCreateWithoutDossierInputObjectSchema } from './CommentsCreateWithoutDossierInput.schema';
import { CommentsUncheckedCreateWithoutDossierInputObjectSchema } from './CommentsUncheckedCreateWithoutDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.CommentsCreateOrConnectWithoutDossierInput> = z
  .object({
    where: z.lazy(() => CommentsWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => CommentsCreateWithoutDossierInputObjectSchema),
      z.lazy(() => CommentsUncheckedCreateWithoutDossierInputObjectSchema),
    ]),
  })
  .strict();

export const CommentsCreateOrConnectWithoutDossierInputObjectSchema = Schema;
