import { z } from 'zod';
import { PieceDossierCreateInputObjectSchema } from './objects/PieceDossierCreateInput.schema';
import { PieceDossierUncheckedCreateInputObjectSchema } from './objects/PieceDossierUncheckedCreateInput.schema';

export const PieceDossierCreateOneSchema = z.object({
  data: z.union([
    PieceDossierCreateInputObjectSchema,
    PieceDossierUncheckedCreateInputObjectSchema,
  ]),
});
