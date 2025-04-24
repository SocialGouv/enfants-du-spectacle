import { z } from 'zod';
import { SocieteProductionWhereUniqueInputObjectSchema } from './objects/SocieteProductionWhereUniqueInput.schema';
import { SocieteProductionCreateInputObjectSchema } from './objects/SocieteProductionCreateInput.schema';
import { SocieteProductionUncheckedCreateInputObjectSchema } from './objects/SocieteProductionUncheckedCreateInput.schema';
import { SocieteProductionUpdateInputObjectSchema } from './objects/SocieteProductionUpdateInput.schema';
import { SocieteProductionUncheckedUpdateInputObjectSchema } from './objects/SocieteProductionUncheckedUpdateInput.schema';

export const SocieteProductionUpsertSchema = z.object({
  where: SocieteProductionWhereUniqueInputObjectSchema,
  create: z.union([
    SocieteProductionCreateInputObjectSchema,
    SocieteProductionUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    SocieteProductionUpdateInputObjectSchema,
    SocieteProductionUncheckedUpdateInputObjectSchema,
  ]),
});
