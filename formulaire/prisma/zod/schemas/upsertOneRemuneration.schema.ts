import { z } from 'zod';
import { RemunerationWhereUniqueInputObjectSchema } from './objects/RemunerationWhereUniqueInput.schema';
import { RemunerationCreateInputObjectSchema } from './objects/RemunerationCreateInput.schema';
import { RemunerationUncheckedCreateInputObjectSchema } from './objects/RemunerationUncheckedCreateInput.schema';
import { RemunerationUpdateInputObjectSchema } from './objects/RemunerationUpdateInput.schema';
import { RemunerationUncheckedUpdateInputObjectSchema } from './objects/RemunerationUncheckedUpdateInput.schema';

export const RemunerationUpsertSchema = z.object({
  where: RemunerationWhereUniqueInputObjectSchema,
  create: z.union([
    RemunerationCreateInputObjectSchema,
    RemunerationUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    RemunerationUpdateInputObjectSchema,
    RemunerationUncheckedUpdateInputObjectSchema,
  ]),
});
