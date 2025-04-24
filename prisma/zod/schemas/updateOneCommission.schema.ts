import { z } from 'zod';
import { CommissionUpdateInputObjectSchema } from './objects/CommissionUpdateInput.schema';
import { CommissionUncheckedUpdateInputObjectSchema } from './objects/CommissionUncheckedUpdateInput.schema';
import { CommissionWhereUniqueInputObjectSchema } from './objects/CommissionWhereUniqueInput.schema';

export const CommissionUpdateOneSchema = z.object({
  data: z.union([
    CommissionUpdateInputObjectSchema,
    CommissionUncheckedUpdateInputObjectSchema,
  ]),
  where: CommissionWhereUniqueInputObjectSchema,
});
