import { z } from 'zod';
import { RoleSchema } from '../enums/Role.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumRoleNullableFilter> = z
  .object({
    equals: z
      .lazy(() => RoleSchema)
      .optional()
      .nullable(),
    in: z
      .union([z.lazy(() => RoleSchema).array(), z.lazy(() => RoleSchema)])
      .optional()
      .nullable(),
    notIn: z
      .union([z.lazy(() => RoleSchema).array(), z.lazy(() => RoleSchema)])
      .optional()
      .nullable(),
    not: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => NestedEnumRoleNullableFilterObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const NestedEnumRoleNullableFilterObjectSchema = Schema;
