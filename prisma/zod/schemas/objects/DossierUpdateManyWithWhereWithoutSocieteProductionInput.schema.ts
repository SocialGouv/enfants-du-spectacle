import { z } from 'zod';
import { DossierScalarWhereInputObjectSchema } from './DossierScalarWhereInput.schema';
import { DossierUpdateManyMutationInputObjectSchema } from './DossierUpdateManyMutationInput.schema';
import { DossierUncheckedUpdateManyWithoutDossiersInputObjectSchema } from './DossierUncheckedUpdateManyWithoutDossiersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdateManyWithWhereWithoutSocieteProductionInput> =
  z
    .object({
      where: z.lazy(() => DossierScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => DossierUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => DossierUncheckedUpdateManyWithoutDossiersInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const DossierUpdateManyWithWhereWithoutSocieteProductionInputObjectSchema =
  Schema;
