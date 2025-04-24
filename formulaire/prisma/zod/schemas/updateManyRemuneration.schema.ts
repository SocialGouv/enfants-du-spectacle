import { z } from 'zod';
import { RemunerationUpdateManyMutationInputObjectSchema } from './objects/RemunerationUpdateManyMutationInput.schema';
import { RemunerationWhereInputObjectSchema } from './objects/RemunerationWhereInput.schema';

export const RemunerationUpdateManySchema = z.object({
  data: RemunerationUpdateManyMutationInputObjectSchema,
  where: RemunerationWhereInputObjectSchema.optional(),
});
