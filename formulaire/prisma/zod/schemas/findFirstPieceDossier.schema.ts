import { z } from 'zod';
import { PieceDossierOrderByWithRelationInputObjectSchema } from './objects/PieceDossierOrderByWithRelationInput.schema';
import { PieceDossierWhereInputObjectSchema } from './objects/PieceDossierWhereInput.schema';
import { PieceDossierWhereUniqueInputObjectSchema } from './objects/PieceDossierWhereUniqueInput.schema';
import { PieceDossierScalarFieldEnumSchema } from './enums/PieceDossierScalarFieldEnum.schema';

export const PieceDossierFindFirstSchema = z.object({
  orderBy: z
    .union([
      PieceDossierOrderByWithRelationInputObjectSchema,
      PieceDossierOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: PieceDossierWhereInputObjectSchema.optional(),
  cursor: PieceDossierWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(PieceDossierScalarFieldEnumSchema).optional(),
});
