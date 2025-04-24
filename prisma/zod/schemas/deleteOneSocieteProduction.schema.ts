import { z } from 'zod';
import { SocieteProductionWhereUniqueInputObjectSchema } from './objects/SocieteProductionWhereUniqueInput.schema';

export const SocieteProductionDeleteOneSchema = z.object({
  where: SocieteProductionWhereUniqueInputObjectSchema,
});
