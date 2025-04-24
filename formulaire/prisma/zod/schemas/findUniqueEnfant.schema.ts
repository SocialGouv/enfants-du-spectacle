import { z } from 'zod';
import { EnfantWhereUniqueInputObjectSchema } from './objects/EnfantWhereUniqueInput.schema';

export const EnfantFindUniqueSchema = z.object({
  where: EnfantWhereUniqueInputObjectSchema,
});
