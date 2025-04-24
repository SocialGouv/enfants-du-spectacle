import { z } from 'zod';
import { SocieteProductionWhereInputObjectSchema } from './objects/SocieteProductionWhereInput.schema';

export const SocieteProductionDeleteManySchema = z.object({
  where: SocieteProductionWhereInputObjectSchema.optional(),
});
