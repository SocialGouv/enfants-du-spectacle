import { z } from 'zod';
import { DemandeurUpdateManyMutationInputObjectSchema } from './objects/DemandeurUpdateManyMutationInput.schema';
import { DemandeurWhereInputObjectSchema } from './objects/DemandeurWhereInput.schema';

export const DemandeurUpdateManySchema = z.object({
  data: DemandeurUpdateManyMutationInputObjectSchema,
  where: DemandeurWhereInputObjectSchema.optional(),
});
