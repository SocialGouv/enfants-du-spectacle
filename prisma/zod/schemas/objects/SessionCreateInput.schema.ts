import { z } from 'zod';
import { UserCreateNestedOneWithoutSessionsInputObjectSchema } from './UserCreateNestedOneWithoutSessionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.SessionCreateInput> = z
  .object({
    sessionToken: z.string(),
    expires: z.coerce.date(),
    user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputObjectSchema),
  })
  .strict();

export const SessionCreateInputObjectSchema = Schema;
