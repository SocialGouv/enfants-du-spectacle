import { z } from 'zod';
import { DossierUpdateWithoutCommentairesInputObjectSchema } from './DossierUpdateWithoutCommentairesInput.schema';
import { DossierUncheckedUpdateWithoutCommentairesInputObjectSchema } from './DossierUncheckedUpdateWithoutCommentairesInput.schema';
import { DossierCreateWithoutCommentairesInputObjectSchema } from './DossierCreateWithoutCommentairesInput.schema';
import { DossierUncheckedCreateWithoutCommentairesInputObjectSchema } from './DossierUncheckedCreateWithoutCommentairesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpsertWithoutCommentairesInput> = z
  .object({
    update: z.union([
      z.lazy(() => DossierUpdateWithoutCommentairesInputObjectSchema),
      z.lazy(() => DossierUncheckedUpdateWithoutCommentairesInputObjectSchema),
    ]),
    create: z.union([
      z.lazy(() => DossierCreateWithoutCommentairesInputObjectSchema),
      z.lazy(() => DossierUncheckedCreateWithoutCommentairesInputObjectSchema),
    ]),
  })
  .strict();

export const DossierUpsertWithoutCommentairesInputObjectSchema = Schema;
