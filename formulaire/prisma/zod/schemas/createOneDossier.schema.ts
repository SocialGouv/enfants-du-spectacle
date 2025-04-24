import { z } from 'zod';
import { DossierCreateInputObjectSchema } from './objects/DossierCreateInput.schema';
import { DossierUncheckedCreateInputObjectSchema } from './objects/DossierUncheckedCreateInput.schema';

export const DossierCreateOneSchema = z.object({
  data: z.union([
    DossierCreateInputObjectSchema,
    DossierUncheckedCreateInputObjectSchema,
  ]),
});
