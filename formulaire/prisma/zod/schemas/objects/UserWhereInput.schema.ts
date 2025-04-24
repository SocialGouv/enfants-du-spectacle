import { z } from 'zod';
import { IntFilterObjectSchema } from './IntFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumRoleNullableFilterObjectSchema } from './EnumRoleNullableFilter.schema';
import { RoleSchema } from '../enums/Role.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { AccountListRelationFilterObjectSchema } from './AccountListRelationFilter.schema';
import { SessionListRelationFilterObjectSchema } from './SessionListRelationFilter.schema';
import { DossierListRelationFilterObjectSchema } from './DossierListRelationFilter.schema';
import { EnfantListRelationFilterObjectSchema } from './EnfantListRelationFilter.schema';
import { CommentsListRelationFilterObjectSchema } from './CommentsListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputObjectSchema),
        z.lazy(() => UserWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterObjectSchema), z.number()]).optional(),
    name: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    nom: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    prenom: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    email: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    telephone: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    fonction: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    emailVerified: z
      .union([
        z.lazy(() => DateTimeNullableFilterObjectSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()])
      .optional(),
    role: z
      .union([
        z.lazy(() => EnumRoleNullableFilterObjectSchema),
        z.lazy(() => RoleSchema),
      ])
      .optional()
      .nullable(),
    departement: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    departements: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    Account: z.lazy(() => AccountListRelationFilterObjectSchema).optional(),
    Session: z.lazy(() => SessionListRelationFilterObjectSchema).optional(),
    dossiers: z.lazy(() => DossierListRelationFilterObjectSchema).optional(),
    Enfant: z.lazy(() => EnfantListRelationFilterObjectSchema).optional(),
    comments: z.lazy(() => CommentsListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const UserWhereInputObjectSchema = Schema;
