import { z } from 'zod';
import { DossierScalarWhereInputObjectSchema } from './DossierScalarWhereInput.schema';
import { DossierUpdateManyMutationInputObjectSchema } from './DossierUpdateManyMutationInput.schema';
import { DossierUncheckedUpdateManyWithoutDossiersMedecinInputObjectSchema } from './DossierUncheckedUpdateManyWithoutDossiersMedecinInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.DossierUpdateManyWithWhereWithoutMedecinInput> =
  z
    .object({
      where: z.lazy(() => DossierScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => DossierUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            DossierUncheckedUpdateManyWithoutDossiersMedecinInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const DossierUpdateManyWithWhereWithoutMedecinInputObjectSchema = Schema;
