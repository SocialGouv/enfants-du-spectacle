import { z } from 'zod';
import { DemandeurWhereUniqueInputObjectSchema } from './objects/DemandeurWhereUniqueInput.schema';

export const DemandeurDeleteOneSchema = z.object({
  where: DemandeurWhereUniqueInputObjectSchema,
});
