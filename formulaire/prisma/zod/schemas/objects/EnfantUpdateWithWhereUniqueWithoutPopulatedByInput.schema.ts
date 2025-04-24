import { z } from 'zod';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';
import { EnfantUpdateWithoutPopulatedByInputObjectSchema } from './EnfantUpdateWithoutPopulatedByInput.schema';
import { EnfantUncheckedUpdateWithoutPopulatedByInputObjectSchema } from './EnfantUncheckedUpdateWithoutPopulatedByInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpdateWithWhereUniqueWithoutPopulatedByInput> =
  z
    .object({
      where: z.lazy(() => EnfantWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => EnfantUpdateWithoutPopulatedByInputObjectSchema),
        z.lazy(() => EnfantUncheckedUpdateWithoutPopulatedByInputObjectSchema),
      ]),
    })
    .strict();

export const EnfantUpdateWithWhereUniqueWithoutPopulatedByInputObjectSchema =
  Schema;
