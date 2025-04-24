import { z } from 'zod';
import { EnfantWhereUniqueInputObjectSchema } from './objects/EnfantWhereUniqueInput.schema';

export const EnfantDeleteOneSchema = z.object({
  where: EnfantWhereUniqueInputObjectSchema,
});
