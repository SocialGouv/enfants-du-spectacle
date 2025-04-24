import { z } from 'zod';
import { PieceDossierWhereInputObjectSchema } from './objects/PieceDossierWhereInput.schema';

export const PieceDossierDeleteManySchema = z.object({
  where: PieceDossierWhereInputObjectSchema.optional(),
});
