import { z } from 'zod';
import { CommissionWhereUniqueInputObjectSchema } from './objects/CommissionWhereUniqueInput.schema';
import { CommissionCreateInputObjectSchema } from './objects/CommissionCreateInput.schema';
import { CommissionUncheckedCreateInputObjectSchema } from './objects/CommissionUncheckedCreateInput.schema';
import { CommissionUpdateInputObjectSchema } from './objects/CommissionUpdateInput.schema';
import { CommissionUncheckedUpdateInputObjectSchema } from './objects/CommissionUncheckedUpdateInput.schema';

export const CommissionUpsertSchema = z.object({
  where: CommissionWhereUniqueInputObjectSchema,
  create: z.union([
    CommissionCreateInputObjectSchema,
    CommissionUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    CommissionUpdateInputObjectSchema,
    CommissionUncheckedUpdateInputObjectSchema,
  ]),
});
