import { z } from 'zod';
import { DemandeurWhereInputObjectSchema } from './objects/DemandeurWhereInput.schema';

export const DemandeurDeleteManySchema = z.object({
  where: DemandeurWhereInputObjectSchema.optional(),
});
