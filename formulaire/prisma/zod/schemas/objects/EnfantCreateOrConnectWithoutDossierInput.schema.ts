import { z } from 'zod';
import { EnfantWhereUniqueInputObjectSchema } from './EnfantWhereUniqueInput.schema';
import { EnfantCreateWithoutDossierInputObjectSchema } from './EnfantCreateWithoutDossierInput.schema';
import { EnfantUncheckedCreateWithoutDossierInputObjectSchema } from './EnfantUncheckedCreateWithoutDossierInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.EnfantCreateOrConnectWithoutDossierInput> = z
  .object({
    where: z.lazy(() => EnfantWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => EnfantCreateWithoutDossierInputObjectSchema),
      z.lazy(() => EnfantUncheckedCreateWithoutDossierInputObjectSchema),
    ]),
  })
  .strict();

export const EnfantCreateOrConnectWithoutDossierInputObjectSchema = Schema;
