import { z } from 'zod';
import { EnfantCreateInputObjectSchema } from './objects/EnfantCreateInput.schema';
import { EnfantUncheckedCreateInputObjectSchema } from './objects/EnfantUncheckedCreateInput.schema';

export const EnfantCreateOneSchema = z.object({
  data: z.union([
    EnfantCreateInputObjectSchema,
    EnfantUncheckedCreateInputObjectSchema,
  ]),
});
