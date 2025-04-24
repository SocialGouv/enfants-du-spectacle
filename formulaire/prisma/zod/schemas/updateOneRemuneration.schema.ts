import { z } from 'zod';
import { RemunerationUpdateInputObjectSchema } from './objects/RemunerationUpdateInput.schema';
import { RemunerationUncheckedUpdateInputObjectSchema } from './objects/RemunerationUncheckedUpdateInput.schema';
import { RemunerationWhereUniqueInputObjectSchema } from './objects/RemunerationWhereUniqueInput.schema';

export const RemunerationUpdateOneSchema = z.object({
  data: z.union([
    RemunerationUpdateInputObjectSchema,
    RemunerationUncheckedUpdateInputObjectSchema,
  ]),
  where: RemunerationWhereUniqueInputObjectSchema,
});
