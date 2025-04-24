import { z } from 'zod';
import { DossierUpdateManyMutationInputObjectSchema } from './objects/DossierUpdateManyMutationInput.schema';
import { DossierWhereInputObjectSchema } from './objects/DossierWhereInput.schema';

export const DossierUpdateManySchema = z.object({
  data: DossierUpdateManyMutationInputObjectSchema,
  where: DossierWhereInputObjectSchema.optional(),
});
