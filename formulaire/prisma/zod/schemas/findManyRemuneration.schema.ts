import { z } from 'zod';
import { RemunerationOrderByWithRelationInputObjectSchema } from './objects/RemunerationOrderByWithRelationInput.schema';
import { RemunerationWhereInputObjectSchema } from './objects/RemunerationWhereInput.schema';
import { RemunerationWhereUniqueInputObjectSchema } from './objects/RemunerationWhereUniqueInput.schema';
import { RemunerationScalarFieldEnumSchema } from './enums/RemunerationScalarFieldEnum.schema';

export const RemunerationFindManySchema = z.object({
  orderBy: z
    .union([
      RemunerationOrderByWithRelationInputObjectSchema,
      RemunerationOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: RemunerationWhereInputObjectSchema.optional(),
  cursor: RemunerationWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(RemunerationScalarFieldEnumSchema).optional(),
});
