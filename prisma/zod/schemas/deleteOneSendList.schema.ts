import { z } from 'zod';
import { SendListWhereUniqueInputObjectSchema } from './objects/SendListWhereUniqueInput.schema';

export const SendListDeleteOneSchema = z.object({
  where: SendListWhereUniqueInputObjectSchema,
});
