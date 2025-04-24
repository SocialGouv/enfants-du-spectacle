import { z } from 'zod';
import { CommissionWhereUniqueInputObjectSchema } from './objects/CommissionWhereUniqueInput.schema';

export const CommissionDeleteOneSchema = z.object({
  where: CommissionWhereUniqueInputObjectSchema,
});
