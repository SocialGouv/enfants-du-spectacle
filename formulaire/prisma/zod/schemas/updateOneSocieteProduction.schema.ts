import { z } from 'zod';
import { SocieteProductionUpdateInputObjectSchema } from './objects/SocieteProductionUpdateInput.schema';
import { SocieteProductionUncheckedUpdateInputObjectSchema } from './objects/SocieteProductionUncheckedUpdateInput.schema';
import { SocieteProductionWhereUniqueInputObjectSchema } from './objects/SocieteProductionWhereUniqueInput.schema';

export const SocieteProductionUpdateOneSchema = z.object({
  data: z.union([
    SocieteProductionUpdateInputObjectSchema,
    SocieteProductionUncheckedUpdateInputObjectSchema,
  ]),
  where: SocieteProductionWhereUniqueInputObjectSchema,
});
