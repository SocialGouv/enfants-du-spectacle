import { z } from 'zod';
import { SocieteProductionUpdateManyMutationInputObjectSchema } from './objects/SocieteProductionUpdateManyMutationInput.schema';
import { SocieteProductionWhereInputObjectSchema } from './objects/SocieteProductionWhereInput.schema';

export const SocieteProductionUpdateManySchema = z.object({
  data: SocieteProductionUpdateManyMutationInputObjectSchema,
  where: SocieteProductionWhereInputObjectSchema.optional(),
});
