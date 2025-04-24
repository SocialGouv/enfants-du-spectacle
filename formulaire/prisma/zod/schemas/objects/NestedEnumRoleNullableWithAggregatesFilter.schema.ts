import { z } from 'zod';
import { RoleSchema } from '../enums/Role.schema';
import { NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumRoleNullableFilterObjectSchema } from './NestedEnumRoleNullableFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NestedEnumRoleNullableWithAggregatesFilter> = z
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
        z.lazy(() => NestedEnumRoleNullableWithAggregatesFilterObjectSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
    _min: z.lazy(() => NestedEnumRoleNullableFilterObjectSchema).optional(),
    _max: z.lazy(() => NestedEnumRoleNullableFilterObjectSchema).optional(),
  })
  .strict();

export const NestedEnumRoleNullableWithAggregatesFilterObjectSchema = Schema;
