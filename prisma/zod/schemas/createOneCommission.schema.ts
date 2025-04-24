import { z } from 'zod';
import { CommissionCreateInputObjectSchema } from './objects/CommissionCreateInput.schema';
import { CommissionUncheckedCreateInputObjectSchema } from './objects/CommissionUncheckedCreateInput.schema';

export const CommissionCreateOneSchema = z.object({
  data: z.union([
    CommissionCreateInputObjectSchema,
    CommissionUncheckedCreateInputObjectSchema,
  ]),
});
