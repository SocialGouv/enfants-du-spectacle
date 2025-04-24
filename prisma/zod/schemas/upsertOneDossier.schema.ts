import { z } from 'zod';
import { DossierWhereUniqueInputObjectSchema } from './objects/DossierWhereUniqueInput.schema';
import { DossierCreateInputObjectSchema } from './objects/DossierCreateInput.schema';
import { DossierUncheckedCreateInputObjectSchema } from './objects/DossierUncheckedCreateInput.schema';
import { DossierUpdateInputObjectSchema } from './objects/DossierUpdateInput.schema';
import { DossierUncheckedUpdateInputObjectSchema } from './objects/DossierUncheckedUpdateInput.schema';

export const DossierUpsertSchema = z.object({
  where: DossierWhereUniqueInputObjectSchema,
  create: z.union([
    DossierCreateInputObjectSchema,
    DossierUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    DossierUpdateInputObjectSchema,
    DossierUncheckedUpdateInputObjectSchema,
  ]),
});
