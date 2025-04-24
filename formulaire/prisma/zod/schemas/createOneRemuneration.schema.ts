import { z } from 'zod';
import { RemunerationCreateInputObjectSchema } from './objects/RemunerationCreateInput.schema';
import { RemunerationUncheckedCreateInputObjectSchema } from './objects/RemunerationUncheckedCreateInput.schema';

export const RemunerationCreateOneSchema = z.object({
  data: z.union([
    RemunerationCreateInputObjectSchema,
    RemunerationUncheckedCreateInputObjectSchema,
  ]),
});
