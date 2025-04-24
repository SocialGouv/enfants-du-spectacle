import { z } from 'zod';
import { RemunerationWhereInputObjectSchema } from './objects/RemunerationWhereInput.schema';

export const RemunerationDeleteManySchema = z.object({
  where: RemunerationWhereInputObjectSchema.optional(),
});
