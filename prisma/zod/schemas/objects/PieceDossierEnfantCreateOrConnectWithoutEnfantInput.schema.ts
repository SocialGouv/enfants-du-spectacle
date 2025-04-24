import { z } from 'zod';
import { PieceDossierEnfantWhereUniqueInputObjectSchema } from './PieceDossierEnfantWhereUniqueInput.schema';
import { PieceDossierEnfantCreateWithoutEnfantInputObjectSchema } from './PieceDossierEnfantCreateWithoutEnfantInput.schema';
import { PieceDossierEnfantUncheckedCreateWithoutEnfantInputObjectSchema } from './PieceDossierEnfantUncheckedCreateWithoutEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PieceDossierEnfantCreateOrConnectWithoutEnfantInput> =
  z
    .object({
      where: z.lazy(() => PieceDossierEnfantWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => PieceDossierEnfantCreateWithoutEnfantInputObjectSchema),
        z.lazy(
          () => PieceDossierEnfantUncheckedCreateWithoutEnfantInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const PieceDossierEnfantCreateOrConnectWithoutEnfantInputObjectSchema =
  Schema;
