import { z } from 'zod';
import { SendListCreateInputObjectSchema } from './objects/SendListCreateInput.schema';
import { SendListUncheckedCreateInputObjectSchema } from './objects/SendListUncheckedCreateInput.schema';

export const SendListCreateOneSchema = z.object({
  data: z.union([
    SendListCreateInputObjectSchema,
    SendListUncheckedCreateInputObjectSchema,
  ]),
});
