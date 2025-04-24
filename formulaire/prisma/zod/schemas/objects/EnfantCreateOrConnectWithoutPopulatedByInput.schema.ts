import { z } from 'zod';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';
import { EnfantCreateWithoutPopulatedByInputObjectSchema } from './EnfantCreateWithoutPopulatedByInput.schema';
import { EnfantUncheckedCreateWithoutPopulatedByInputObjectSchema } from './EnfantUncheckedCreateWithoutPopulatedByInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantCreateOrConnectWithoutPopulatedByInput> = z
  .object({
    where: z.lazy(() => EnfantWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => EnfantCreateWithoutPopulatedByInputObjectSchema),
      z.lazy(() => EnfantUncheckedCreateWithoutPopulatedByInputObjectSchema),
    ]),
  })
  .strict();

export const EnfantCreateOrConnectWithoutPopulatedByInputObjectSchema = Schema;
