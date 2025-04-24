import { z } from 'zod';
import { DemandeurOrderByWithRelationInputObjectSchema } from './objects/DemandeurOrderByWithRelationInput.schema';
import { DemandeurWhereInputObjectSchema } from './objects/DemandeurWhereInput.schema';
import { DemandeurWhereUniqueInputObjectSchema } from './objects/DemandeurWhereUniqueInput.schema';
import { DemandeurScalarFieldEnumSchema } from './enums/DemandeurScalarFieldEnum.schema';

export const DemandeurFindManySchema = z.object({
  orderBy: z
    .union([
      DemandeurOrderByWithRelationInputObjectSchema,
      DemandeurOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: DemandeurWhereInputObjectSchema.optional(),
  cursor: DemandeurWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(DemandeurScalarFieldEnumSchema).optional(),
});
