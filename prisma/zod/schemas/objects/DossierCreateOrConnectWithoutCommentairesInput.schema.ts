import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierCreateWithoutCommentairesInputObjectSchema } from './DossierCreateWithoutCommentairesInput.schema';
import { DossierUncheckedCreateWithoutCommentairesInputObjectSchema } from './DossierUncheckedCreateWithoutCommentairesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateOrConnectWithoutCommentairesInput> =
  z
    .object({
      where: z.lazy(() => DossierWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => DossierCreateWithoutCommentairesInputObjectSchema),
        z.lazy(
          () => DossierUncheckedCreateWithoutCommentairesInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const DossierCreateOrConnectWithoutCommentairesInputObjectSchema =
  Schema;
