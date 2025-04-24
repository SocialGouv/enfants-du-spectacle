import { z } from 'zod';
import { SendListWhereUniqueInputObjectSchema } from './objects/SendListWhereUniqueInput.schema';
import { SendListCreateInputObjectSchema } from './objects/SendListCreateInput.schema';
import { SendListUncheckedCreateInputObjectSchema } from './objects/SendListUncheckedCreateInput.schema';
import { SendListUpdateInputObjectSchema } from './objects/SendListUpdateInput.schema';
import { SendListUncheckedUpdateInputObjectSchema } from './objects/SendListUncheckedUpdateInput.schema';

export const SendListUpsertSchema = z.object({
  where: SendListWhereUniqueInputObjectSchema,
  create: z.union([
    SendListCreateInputObjectSchema,
    SendListUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    SendListUpdateInputObjectSchema,
    SendListUncheckedUpdateInputObjectSchema,
  ]),
});
