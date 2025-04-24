import { z } from 'zod';
import { PieceDossierEnfantOrderByWithRelationInputObjectSchema } from './objects/PieceDossierEnfantOrderByWithRelationInput.schema';
import { PieceDossierEnfantWhereInputObjectSchema } from './objects/PieceDossierEnfantWhereInput.schema';
import { PieceDossierEnfantWhereUniqueInputObjectSchema } from './objects/PieceDossierEnfantWhereUniqueInput.schema';
import { PieceDossierEnfantScalarFieldEnumSchema } from './enums/PieceDossierEnfantScalarFieldEnum.schema';

export const PieceDossierEnfantFindFirstSchema = z.object({
  orderBy: z
    .union([
      PieceDossierEnfantOrderByWithRelationInputObjectSchema,
      PieceDossierEnfantOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: PieceDossierEnfantWhereInputObjectSchema.optional(),
  cursor: PieceDossierEnfantWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(PieceDossierEnfantScalarFieldEnumSchema).optional(),
});
