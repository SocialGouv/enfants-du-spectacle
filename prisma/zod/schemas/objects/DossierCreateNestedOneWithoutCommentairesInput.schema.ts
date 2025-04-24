import { z } from 'zod';
import { DossierCreateWithoutCommentairesInputObjectSchema } from './DossierCreateWithoutCommentairesInput.schema';
import { DossierUncheckedCreateWithoutCommentairesInputObjectSchema } from './DossierUncheckedCreateWithoutCommentairesInput.schema';
import { DossierCreateOrConnectWithoutCommentairesInputObjectSchema } from './DossierCreateOrConnectWithoutCommentairesInput.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateNestedOneWithoutCommentairesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DossierCreateWithoutCommentairesInputObjectSchema),
          z.lazy(
            () => DossierUncheckedCreateWithoutCommentairesInputObjectSchema,
          ),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DossierCreateOrConnectWithoutCommentairesInputObjectSchema)
        .optional(),
      connect: z.lazy(() => DossierWhereUniqueInputObjectSchema).optional(),
    })
    .strict();

export const DossierCreateNestedOneWithoutCommentairesInputObjectSchema =
  Schema;
