import { z } from 'zod';
import { StatusNotifSchema } from '../enums/StatusNotif.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.NullableEnumStatusNotifFieldUpdateOperationsInput> =
  z
    .object({
      set: z
        .lazy(() => StatusNotifSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const NullableEnumStatusNotifFieldUpdateOperationsInputObjectSchema =
  Schema;
