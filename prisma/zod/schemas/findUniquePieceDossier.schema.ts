import { z } from 'zod';
import { PieceDossierWhereUniqueInputObjectSchema } from './objects/PieceDossierWhereUniqueInput.schema';

export const PieceDossierFindUniqueSchema = z.object({
  where: PieceDossierWhereUniqueInputObjectSchema,
});
