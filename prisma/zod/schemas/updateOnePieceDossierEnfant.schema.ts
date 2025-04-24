import { z } from 'zod';
import { PieceDossierEnfantUpdateInputObjectSchema } from './objects/PieceDossierEnfantUpdateInput.schema';
import { PieceDossierEnfantUncheckedUpdateInputObjectSchema } from './objects/PieceDossierEnfantUncheckedUpdateInput.schema';
import { PieceDossierEnfantWhereUniqueInputObjectSchema } from './objects/PieceDossierEnfantWhereUniqueInput.schema';

export const PieceDossierEnfantUpdateOneSchema = z.object({
  data: z.union([
    PieceDossierEnfantUpdateInputObjectSchema,
    PieceDossierEnfantUncheckedUpdateInputObjectSchema,
  ]),
  where: PieceDossierEnfantWhereUniqueInputObjectSchema,
});
