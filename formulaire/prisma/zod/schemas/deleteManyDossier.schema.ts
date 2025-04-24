import { z } from 'zod';
import { DossierWhereInputObjectSchema } from './objects/DossierWhereInput.schema';

export const DossierDeleteManySchema = z.object({
  where: DossierWhereInputObjectSchema.optional(),
});
