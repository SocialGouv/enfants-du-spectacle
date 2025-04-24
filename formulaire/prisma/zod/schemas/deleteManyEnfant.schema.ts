import { z } from 'zod';
import { EnfantWhereInputObjectSchema } from './objects/EnfantWhereInput.schema';

export const EnfantDeleteManySchema = z.object({
  where: EnfantWhereInputObjectSchema.optional(),
});
