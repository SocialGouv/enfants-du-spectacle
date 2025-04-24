import { z } from 'zod';
import { SocieteProductionWhereUniqueInputObjectSchema } from './objects/SocieteProductionWhereUniqueInput.schema';

export const SocieteProductionFindUniqueSchema = z.object({
  where: SocieteProductionWhereUniqueInputObjectSchema,
});
