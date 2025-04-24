import { z } from 'zod';
import { CommissionWhereUniqueInputObjectSchema } from './objects/CommissionWhereUniqueInput.schema';

export const CommissionFindUniqueSchema = z.object({
  where: CommissionWhereUniqueInputObjectSchema,
});
