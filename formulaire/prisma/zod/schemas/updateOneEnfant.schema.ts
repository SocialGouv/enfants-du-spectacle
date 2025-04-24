import { z } from 'zod';
import { EnfantUpdateInputObjectSchema } from './objects/EnfantUpdateInput.schema';
import { EnfantUncheckedUpdateInputObjectSchema } from './objects/EnfantUncheckedUpdateInput.schema';
import { EnfantWhereUniqueInputObjectSchema } from './objects/EnfantWhereUniqueInput.schema';

export const EnfantUpdateOneSchema = z.object({
  data: z.union([
    EnfantUpdateInputObjectSchema,
    EnfantUncheckedUpdateInputObjectSchema,
  ]),
  where: EnfantWhereUniqueInputObjectSchema,
});
