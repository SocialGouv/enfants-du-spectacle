import { z } from 'zod';
import { DemandeurUpdateInputObjectSchema } from './objects/DemandeurUpdateInput.schema';
import { DemandeurUncheckedUpdateInputObjectSchema } from './objects/DemandeurUncheckedUpdateInput.schema';
import { DemandeurWhereUniqueInputObjectSchema } from './objects/DemandeurWhereUniqueInput.schema';

export const DemandeurUpdateOneSchema = z.object({
  data: z.union([
    DemandeurUpdateInputObjectSchema,
    DemandeurUncheckedUpdateInputObjectSchema,
  ]),
  where: DemandeurWhereUniqueInputObjectSchema,
});
