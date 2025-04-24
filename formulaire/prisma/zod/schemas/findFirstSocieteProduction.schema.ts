import { z } from 'zod';
import { SocieteProductionOrderByWithRelationInputObjectSchema } from './objects/SocieteProductionOrderByWithRelationInput.schema';
import { SocieteProductionWhereInputObjectSchema } from './objects/SocieteProductionWhereInput.schema';
import { SocieteProductionWhereUniqueInputObjectSchema } from './objects/SocieteProductionWhereUniqueInput.schema';
import { SocieteProductionScalarFieldEnumSchema } from './enums/SocieteProductionScalarFieldEnum.schema';

export const SocieteProductionFindFirstSchema = z.object({
  orderBy: z
    .union([
      SocieteProductionOrderByWithRelationInputObjectSchema,
      SocieteProductionOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: SocieteProductionWhereInputObjectSchema.optional(),
  cursor: SocieteProductionWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(SocieteProductionScalarFieldEnumSchema).optional(),
});
