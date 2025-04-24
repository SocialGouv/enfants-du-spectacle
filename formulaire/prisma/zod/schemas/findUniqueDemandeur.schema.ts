import { z } from 'zod';
import { DemandeurWhereUniqueInputObjectSchema } from './objects/DemandeurWhereUniqueInput.schema';

export const DemandeurFindUniqueSchema = z.object({
  where: DemandeurWhereUniqueInputObjectSchema,
});
