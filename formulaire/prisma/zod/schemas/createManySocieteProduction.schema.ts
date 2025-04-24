import { z } from 'zod';
import { SocieteProductionCreateManyInputObjectSchema } from './objects/SocieteProductionCreateManyInput.schema';

export const SocieteProductionCreateManySchema = z.object({
  data: z.union([
    SocieteProductionCreateManyInputObjectSchema,
    z.array(SocieteProductionCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
