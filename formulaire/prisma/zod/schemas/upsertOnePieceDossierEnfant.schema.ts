import { z } from 'zod';
import { PieceDossierEnfantWhereUniqueInputObjectSchema } from './objects/PieceDossierEnfantWhereUniqueInput.schema';
import { PieceDossierEnfantCreateInputObjectSchema } from './objects/PieceDossierEnfantCreateInput.schema';
import { PieceDossierEnfantUncheckedCreateInputObjectSchema } from './objects/PieceDossierEnfantUncheckedCreateInput.schema';
import { PieceDossierEnfantUpdateInputObjectSchema } from './objects/PieceDossierEnfantUpdateInput.schema';
import { PieceDossierEnfantUncheckedUpdateInputObjectSchema } from './objects/PieceDossierEnfantUncheckedUpdateInput.schema';

export const PieceDossierEnfantUpsertSchema = z.object({
  where: PieceDossierEnfantWhereUniqueInputObjectSchema,
  create: z.union([
    PieceDossierEnfantCreateInputObjectSchema,
    PieceDossierEnfantUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    PieceDossierEnfantUpdateInputObjectSchema,
    PieceDossierEnfantUncheckedUpdateInputObjectSchema,
  ]),
});
