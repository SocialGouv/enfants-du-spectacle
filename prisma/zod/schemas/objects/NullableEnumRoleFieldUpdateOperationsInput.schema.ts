import { z } from 'zod';
import { RoleSchema } from '../enums/Role.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NullableEnumRoleFieldUpdateOperationsInput> = z
  .object({
    set: z
      .lazy(() => RoleSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const NullableEnumRoleFieldUpdateOperationsInputObjectSchema = Schema;
