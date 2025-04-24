import { z } from 'zod';
import { SendListUpdateInputObjectSchema } from './objects/SendListUpdateInput.schema';
import { SendListUncheckedUpdateInputObjectSchema } from './objects/SendListUncheckedUpdateInput.schema';
import { SendListWhereUniqueInputObjectSchema } from './objects/SendListWhereUniqueInput.schema';

export const SendListUpdateOneSchema = z.object({
  data: z.union([
    SendListUpdateInputObjectSchema,
    SendListUncheckedUpdateInputObjectSchema,
  ]),
  where: SendListWhereUniqueInputObjectSchema,
});
