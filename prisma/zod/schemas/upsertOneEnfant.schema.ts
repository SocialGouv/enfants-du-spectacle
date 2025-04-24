import { z } from 'zod';
import { EnfantWhereUniqueInputObjectSchema } from './objects/EnfantWhereUniqueInput.schema';
import { EnfantCreateInputObjectSchema } from './objects/EnfantCreateInput.schema';
import { EnfantUncheckedCreateInputObjectSchema } from './objects/EnfantUncheckedCreateInput.schema';
import { EnfantUpdateInputObjectSchema } from './objects/EnfantUpdateInput.schema';
import { EnfantUncheckedUpdateInputObjectSchema } from './objects/EnfantUncheckedUpdateInput.schema';

export const EnfantUpsertSchema = z.object({
  where: EnfantWhereUniqueInputObjectSchema,
  create: z.union([
    EnfantCreateInputObjectSchema,
    EnfantUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    EnfantUpdateInputObjectSchema,
    EnfantUncheckedUpdateInputObjectSchema,
  ]),
});
