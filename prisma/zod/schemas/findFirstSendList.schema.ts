import { z } from 'zod';
import { SendListOrderByWithRelationInputObjectSchema } from './objects/SendListOrderByWithRelationInput.schema';
import { SendListWhereInputObjectSchema } from './objects/SendListWhereInput.schema';
import { SendListWhereUniqueInputObjectSchema } from './objects/SendListWhereUniqueInput.schema';
import { SendListScalarFieldEnumSchema } from './enums/SendListScalarFieldEnum.schema';

export const SendListFindFirstSchema = z.object({
  orderBy: z
    .union([
      SendListOrderByWithRelationInputObjectSchema,
      SendListOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: SendListWhereInputObjectSchema.optional(),
  cursor: SendListWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(SendListScalarFieldEnumSchema).optional(),
});
