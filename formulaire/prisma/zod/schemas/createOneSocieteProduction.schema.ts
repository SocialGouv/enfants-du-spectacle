import { z } from 'zod';
import { SocieteProductionCreateInputObjectSchema } from './objects/SocieteProductionCreateInput.schema';
import { SocieteProductionUncheckedCreateInputObjectSchema } from './objects/SocieteProductionUncheckedCreateInput.schema';

export const SocieteProductionCreateOneSchema = z.object({
  data: z.union([
    SocieteProductionCreateInputObjectSchema,
    SocieteProductionUncheckedCreateInputObjectSchema,
  ]),
});
