import { z } from 'zod';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';
import { EnfantUpdateWithoutDossierInputObjectSchema } from './EnfantUpdateWithoutDossierInput.schema';
import { EnfantUncheckedUpdateWithoutDossierInputObjectSchema } from './EnfantUncheckedUpdateWithoutDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpdateWithWhereUniqueWithoutDossierInput> =
  z
    .object({
      where: z.lazy(() => EnfantWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => EnfantUpdateWithoutDossierInputObjectSchema),
        z.lazy(() => EnfantUncheckedUpdateWithoutDossierInputObjectSchema),
      ]),
    })
    .strict();

export const EnfantUpdateWithWhereUniqueWithoutDossierInputObjectSchema =
  Schema;
