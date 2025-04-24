import { z } from 'zod';
import { PieceDossierUpdateManyMutationInputObjectSchema } from './objects/PieceDossierUpdateManyMutationInput.schema';
import { PieceDossierWhereInputObjectSchema } from './objects/PieceDossierWhereInput.schema';

export const PieceDossierUpdateManySchema = z.object({
  data: PieceDossierUpdateManyMutationInputObjectSchema,
  where: PieceDossierWhereInputObjectSchema.optional(),
});
