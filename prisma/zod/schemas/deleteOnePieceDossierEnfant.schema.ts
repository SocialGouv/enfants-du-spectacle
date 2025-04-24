import { z } from 'zod';
import { PieceDossierEnfantWhereUniqueInputObjectSchema } from './objects/PieceDossierEnfantWhereUniqueInput.schema';

export const PieceDossierEnfantDeleteOneSchema = z.object({
  where: PieceDossierEnfantWhereUniqueInputObjectSchema,
});
