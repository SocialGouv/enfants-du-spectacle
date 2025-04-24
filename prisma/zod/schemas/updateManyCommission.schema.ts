import { z } from 'zod';
import { CommissionUpdateManyMutationInputObjectSchema } from './objects/CommissionUpdateManyMutationInput.schema';
import { CommissionWhereInputObjectSchema } from './objects/CommissionWhereInput.schema';

export const CommissionUpdateManySchema = z.object({
  data: CommissionUpdateManyMutationInputObjectSchema,
  where: CommissionWhereInputObjectSchema.optional(),
});
