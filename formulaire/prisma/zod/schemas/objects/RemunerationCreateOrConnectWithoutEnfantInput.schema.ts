import { z } from 'zod';
import { RemunerationWhereUniqueInputObjectSchema } from './RemunerationWhereUniqueInput.schema';
import { RemunerationCreateWithoutEnfantInputObjectSchema } from './RemunerationCreateWithoutEnfantInput.schema';
import { RemunerationUncheckedCreateWithoutEnfantInputObjectSchema } from './RemunerationUncheckedCreateWithoutEnfantInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationCreateOrConnectWithoutEnfantInput> =
  z
    .object({
      where: z.lazy(() => RemunerationWhereUniqueInputObjectSchema),
      create: z.union([
        z.lazy(() => RemunerationCreateWithoutEnfantInputObjectSchema),
        z.lazy(() => RemunerationUncheckedCreateWithoutEnfantInputObjectSchema),
      ]),
    })
    .strict();

export const RemunerationCreateOrConnectWithoutEnfantInputObjectSchema = Schema;
