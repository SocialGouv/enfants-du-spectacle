import { z } from 'zod';
import { DemandeurCreateInputObjectSchema } from './objects/DemandeurCreateInput.schema';
import { DemandeurUncheckedCreateInputObjectSchema } from './objects/DemandeurUncheckedCreateInput.schema';

export const DemandeurCreateOneSchema = z.object({
  data: z.union([
    DemandeurCreateInputObjectSchema,
    DemandeurUncheckedCreateInputObjectSchema,
  ]),
});
