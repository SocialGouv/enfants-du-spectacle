import { z } from 'zod';
import { PieceDossierUpdateInputObjectSchema } from './objects/PieceDossierUpdateInput.schema';
import { PieceDossierUncheckedUpdateInputObjectSchema } from './objects/PieceDossierUncheckedUpdateInput.schema';
import { PieceDossierWhereUniqueInputObjectSchema } from './objects/PieceDossierWhereUniqueInput.schema';

export const PieceDossierUpdateOneSchema = z.object({
  data: z.union([
    PieceDossierUpdateInputObjectSchema,
    PieceDossierUncheckedUpdateInputObjectSchema,
  ]),
  where: PieceDossierWhereUniqueInputObjectSchema,
});
