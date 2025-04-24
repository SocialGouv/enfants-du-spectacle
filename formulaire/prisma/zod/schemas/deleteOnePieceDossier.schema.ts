import { z } from 'zod';
import { PieceDossierWhereUniqueInputObjectSchema } from './objects/PieceDossierWhereUniqueInput.schema';

export const PieceDossierDeleteOneSchema = z.object({
  where: PieceDossierWhereUniqueInputObjectSchema,
});
