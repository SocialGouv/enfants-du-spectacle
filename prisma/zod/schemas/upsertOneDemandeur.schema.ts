import { z } from 'zod';
import { DemandeurWhereUniqueInputObjectSchema } from './objects/DemandeurWhereUniqueInput.schema';
import { DemandeurCreateInputObjectSchema } from './objects/DemandeurCreateInput.schema';
import { DemandeurUncheckedCreateInputObjectSchema } from './objects/DemandeurUncheckedCreateInput.schema';
import { DemandeurUpdateInputObjectSchema } from './objects/DemandeurUpdateInput.schema';
import { DemandeurUncheckedUpdateInputObjectSchema } from './objects/DemandeurUncheckedUpdateInput.schema';

export const DemandeurUpsertSchema = z.object({
  where: DemandeurWhereUniqueInputObjectSchema,
  create: z.union([
    DemandeurCreateInputObjectSchema,
    DemandeurUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    DemandeurUpdateInputObjectSchema,
    DemandeurUncheckedUpdateInputObjectSchema,
  ]),
});
