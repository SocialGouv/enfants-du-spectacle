import { z } from 'zod';
import { RemunerationWhereUniqueInputObjectSchema } from './RemunerationWhereUniqueInput.schema';
import { RemunerationUpdateWithoutEnfantInputObjectSchema } from './RemunerationUpdateWithoutEnfantInput.schema';
import { RemunerationUncheckedUpdateWithoutEnfantInputObjectSchema } from './RemunerationUncheckedUpdateWithoutEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationUpdateWithWhereUniqueWithoutEnfantInput> =
  z
    .object({
      where: z.lazy(() => RemunerationWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => RemunerationUpdateWithoutEnfantInputObjectSchema),
        z.lazy(() => RemunerationUncheckedUpdateWithoutEnfantInputObjectSchema),
      ]),
    })
    .strict();

export const RemunerationUpdateWithWhereUniqueWithoutEnfantInputObjectSchema =
  Schema;
