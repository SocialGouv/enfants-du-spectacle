import { z } from 'zod';
import { PieceDossierWhereUniqueInputObjectSchema } from './objects/PieceDossierWhereUniqueInput.schema';
import { PieceDossierCreateInputObjectSchema } from './objects/PieceDossierCreateInput.schema';
import { PieceDossierUncheckedCreateInputObjectSchema } from './objects/PieceDossierUncheckedCreateInput.schema';
import { PieceDossierUpdateInputObjectSchema } from './objects/PieceDossierUpdateInput.schema';
import { PieceDossierUncheckedUpdateInputObjectSchema } from './objects/PieceDossierUncheckedUpdateInput.schema';

export const PieceDossierUpsertSchema = z.object({
  where: PieceDossierWhereUniqueInputObjectSchema,
  create: z.union([
    PieceDossierCreateInputObjectSchema,
    PieceDossierUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    PieceDossierUpdateInputObjectSchema,
    PieceDossierUncheckedUpdateInputObjectSchema,
  ]),
});
