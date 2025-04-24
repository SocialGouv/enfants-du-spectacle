import { z } from 'zod';
import { DossierCreateWithoutEnfantsInputObjectSchema } from './DossierCreateWithoutEnfantsInput.schema';
import { DossierUncheckedCreateWithoutEnfantsInputObjectSchema } from './DossierUncheckedCreateWithoutEnfantsInput.schema';
import { DossierCreateOrConnectWithoutEnfantsInputObjectSchema } from './DossierCreateOrConnectWithoutEnfantsInput.schema';
import { DossierWhereUniqueInputObjectSchema } from './DossierWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierCreateNestedOneWithoutEnfantsInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => DossierCreateWithoutEnfantsInputObjectSchema),
        z.lazy(() => DossierUncheckedCreateWithoutEnfantsInputObjectSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => DossierCreateOrConnectWithoutEnfantsInputObjectSchema)
      .optional(),
    connect: z.lazy(() => DossierWhereUniqueInputObjectSchema).optional(),
  })
  .strict();

export const DossierCreateNestedOneWithoutEnfantsInputObjectSchema = Schema;
