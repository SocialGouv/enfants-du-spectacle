import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './objects/DossierWhereUniqueInput.schema';

export const DossierDeleteOneSchema = z.object({
  where: DossierWhereUniqueInputObjectSchema,
});
