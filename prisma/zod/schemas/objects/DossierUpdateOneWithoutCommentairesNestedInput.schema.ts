import { z } from 'zod';
import { DossierCreateWithoutCommentairesInputObjectSchema } from './DossierCreateWithoutCommentairesInput.schema';
import { DossierUncheckedCreateWithoutCommentairesInputObjectSchema } from './DossierUncheckedCreateWithoutCommentairesInput.schema';
import { DossierCreateOrConnectWithoutCommentairesInputObjectSchema } from './DossierCreateOrConnectWithoutCommentairesInput.schema';
import { DossierUpsertWithoutCommentairesInputObjectSchema } from './DossierUpsertWithoutCommentairesInput.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';
import { DossierUpdateWithoutCommentairesInputObjectSchema } from './DossierUpdateWithoutCommentairesInput.schema';
import { DossierUncheckedUpdateWithoutCommentairesInputObjectSchema } from './DossierUncheckedUpdateWithoutCommentairesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdateOneWithoutCommentairesNestedInput> =
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
      upsert: z
        .lazy(() => DossierUpsertWithoutCommentairesInputObjectSchema)
        .optional(),
      disconnect: z.boolean().optional(),
      delete: z.boolean().optional(),
      connect: z.lazy(() => DossierWhereUniqueInputObjectSchema).optional(),
      update: z
        .union([
          z.lazy(() => DossierUpdateWithoutCommentairesInputObjectSchema),
          z.lazy(
            () => DossierUncheckedUpdateWithoutCommentairesInputObjectSchema,
          ),
        ])
        .optional(),
    })
    .strict();

export const DossierUpdateOneWithoutCommentairesNestedInputObjectSchema =
  Schema;
