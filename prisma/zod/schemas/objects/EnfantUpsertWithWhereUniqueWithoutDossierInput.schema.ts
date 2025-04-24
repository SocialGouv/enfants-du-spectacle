import { z } from 'zod';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';
import { EnfantUpdateWithoutDossierInputObjectSchema } from './EnfantUpdateWithoutDossierInput.schema';
import { EnfantUncheckedUpdateWithoutDossierInputObjectSchema } from './EnfantUncheckedUpdateWithoutDossierInput.schema';
import { EnfantCreateWithoutDossierInputObjectSchema } from './EnfantCreateWithoutDossierInput.schema';
import { EnfantUncheckedCreateWithoutDossierInputObjectSchema } from './EnfantUncheckedCreateWithoutDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantUpsertWithWhereUniqueWithoutDossierInput> =
  z
    .object({
      where: z.lazy(() => EnfantWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => EnfantUpdateWithoutDossierInputObjectSchema),
        z.lazy(() => EnfantUncheckedUpdateWithoutDossierInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => EnfantCreateWithoutDossierInputObjectSchema),
        z.lazy(() => EnfantUncheckedCreateWithoutDossierInputObjectSchema),
      ]),
    })
    .strict();

export const EnfantUpsertWithWhereUniqueWithoutDossierInputObjectSchema =
  Schema;
