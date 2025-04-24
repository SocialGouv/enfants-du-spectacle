import { z } from 'zod';
import { RemunerationWhereUniqueInputObjectSchema } from './objects/RemunerationWhereUniqueInput.schema';

export const RemunerationFindUniqueSchema = z.object({
  where: RemunerationWhereUniqueInputObjectSchema,
});
