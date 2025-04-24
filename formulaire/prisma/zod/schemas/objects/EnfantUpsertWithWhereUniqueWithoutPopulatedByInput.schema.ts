import { z } from 'zod';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';
import { EnfantUpdateWithoutPopulatedByInputObjectSchema } from './EnfantUpdateWithoutPopulatedByInput.schema';
import { EnfantUncheckedUpdateWithoutPopulatedByInputObjectSchema } from './EnfantUncheckedUpdateWithoutPopulatedByInput.schema';
import { EnfantCreateWithoutPopulatedByInputObjectSchema } from './EnfantCreateWithoutPopulatedByInput.schema';
import { EnfantUncheckedCreateWithoutPopulatedByInputObjectSchema } from './EnfantUncheckedCreateWithoutPopulatedByInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpsertWithWhereUniqueWithoutPopulatedByInput> =
  z
    .object({
      where: z.lazy(() => EnfantWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => EnfantUpdateWithoutPopulatedByInputObjectSchema),
        z.lazy(() => EnfantUncheckedUpdateWithoutPopulatedByInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => EnfantCreateWithoutPopulatedByInputObjectSchema),
        z.lazy(() => EnfantUncheckedCreateWithoutPopulatedByInputObjectSchema),
      ]),
    })
    .strict();

export const EnfantUpsertWithWhereUniqueWithoutPopulatedByInputObjectSchema =
  Schema;
