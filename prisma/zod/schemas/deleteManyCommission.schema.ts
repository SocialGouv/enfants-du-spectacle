import { z } from 'zod';
import { CommissionWhereInputObjectSchema } from './objects/CommissionWhereInput.schema';

export const CommissionDeleteManySchema = z.object({
  where: CommissionWhereInputObjectSchema.optional(),
});
