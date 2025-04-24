import { z } from 'zod';
import { AccountScalarWhereInputObjectSchema } from './AccountScalarWhereInput.schema';
import { AccountUpdateManyMutationInputObjectSchema } from './AccountUpdateManyMutationInput.schema';
import { AccountUncheckedUpdateManyWithoutAccountInputObjectSchema } from './AccountUncheckedUpdateManyWithoutAccountInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z
  .object({
    where: z.lazy(() => AccountScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => AccountUpdateManyMutationInputObjectSchema),
      z.lazy(() => AccountUncheckedUpdateManyWithoutAccountInputObjectSchema),
    ]),
  })
  .strict();

export const AccountUpdateManyWithWhereWithoutUserInputObjectSchema = Schema;
