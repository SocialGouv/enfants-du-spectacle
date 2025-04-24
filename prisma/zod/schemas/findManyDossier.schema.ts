import { z } from 'zod';
import { DossierOrderByWithRelationInputObjectSchema } from './objects/DossierOrderByWithRelationInput.schema';
import { DossierWhereInputObjectSchema } from './objects/DossierWhereInput.schema';
import { DossierWhereUniqueInputObjectSchema } from './objects/DossierWhereUniqueInput.schema';
import { DossierScalarFieldEnumSchema } from './enums/DossierScalarFieldEnum.schema';

export const DossierFindManySchema = z.object({
  orderBy: z
    .union([
      DossierOrderByWithRelationInputObjectSchema,
      DossierOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: DossierWhereInputObjectSchema.optional(),
  cursor: DossierWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(DossierScalarFieldEnumSchema).optional(),
});
