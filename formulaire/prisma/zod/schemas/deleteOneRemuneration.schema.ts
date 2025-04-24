import { z } from 'zod';
import { RemunerationWhereUniqueInputObjectSchema } from './objects/RemunerationWhereUniqueInput.schema';

export const RemunerationDeleteOneSchema = z.object({
  where: RemunerationWhereUniqueInputObjectSchema,
});
