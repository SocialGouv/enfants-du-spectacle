import { z } from 'zod';
import { EnfantUpdateManyMutationInputObjectSchema } from './objects/EnfantUpdateManyMutationInput.schema';
import { EnfantWhereInputObjectSchema } from './objects/EnfantWhereInput.schema';

export const EnfantUpdateManySchema = z.object({
  data: EnfantUpdateManyMutationInputObjectSchema,
  where: EnfantWhereInputObjectSchema.optional(),
});
