import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './objects/DossierWhereUniqueInput.schema';

export const DossierFindUniqueSchema = z.object({
  where: DossierWhereUniqueInputObjectSchema,
});
