import { z } from 'zod';
import { DossierUpdateInputObjectSchema } from './objects/DossierUpdateInput.schema';
import { DossierUncheckedUpdateInputObjectSchema } from './objects/DossierUncheckedUpdateInput.schema';
import { DossierWhereUniqueInputObjectSchema } from './objects/DossierWhereUniqueInput.schema';

export const DossierUpdateOneSchema = z.object({
  data: z.union([
    DossierUpdateInputObjectSchema,
    DossierUncheckedUpdateInputObjectSchema,
  ]),
  where: DossierWhereUniqueInputObjectSchema,
});
