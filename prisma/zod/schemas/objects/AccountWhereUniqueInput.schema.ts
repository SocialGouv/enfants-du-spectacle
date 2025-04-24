import { z } from 'zod';
import { AccountProviderProviderAccountIdCompoundUniqueInputObjectSchema } from './AccountProviderProviderAccountIdCompoundUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AccountWhereUniqueInput> = z
  .object({
    id: z.number().optional(),
    provider_providerAccountId: z
      .lazy(
        () => AccountProviderProviderAccountIdCompoundUniqueInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const AccountWhereUniqueInputObjectSchema = Schema;
