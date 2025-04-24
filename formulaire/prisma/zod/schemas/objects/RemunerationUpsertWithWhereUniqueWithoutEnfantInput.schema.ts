import { z } from 'zod';
import { RemunerationWhereUniqueInputObjectSchema } from './RemunerationWhereUniqueInput.schema';
import { RemunerationUpdateWithoutEnfantInputObjectSchema } from './RemunerationUpdateWithoutEnfantInput.schema';
import { RemunerationUncheckedUpdateWithoutEnfantInputObjectSchema } from './RemunerationUncheckedUpdateWithoutEnfantInput.schema';
import { RemunerationCreateWithoutEnfantInputObjectSchema } from './RemunerationCreateWithoutEnfantInput.schema';
import { RemunerationUncheckedCreateWithoutEnfantInputObjectSchema } from './RemunerationUncheckedCreateWithoutEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationUpsertWithWhereUniqueWithoutEnfantInput> =
  z
    .object({
      where: z.lazy(() => RemunerationWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => RemunerationUpdateWithoutEnfantInputObjectSchema),
        z.lazy(() => RemunerationUncheckedUpdateWithoutEnfantInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => RemunerationCreateWithoutEnfantInputObjectSchema),
        z.lazy(() => RemunerationUncheckedCreateWithoutEnfantInputObjectSchema),
      ]),
    })
    .strict();

export const RemunerationUpsertWithWhereUniqueWithoutEnfantInputObjectSchema =
  Schema;
