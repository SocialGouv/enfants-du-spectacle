import { z } from 'zod';
import { PieceDossierEnfantWhereUniqueInputObjectSchema } from './objects/PieceDossierEnfantWhereUniqueInput.schema';

export const PieceDossierEnfantFindUniqueSchema = z.object({
  where: PieceDossierEnfantWhereUniqueInputObjectSchema,
});
