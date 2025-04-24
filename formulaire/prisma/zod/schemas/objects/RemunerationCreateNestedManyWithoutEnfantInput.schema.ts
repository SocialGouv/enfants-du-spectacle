import { z } from 'zod';
import { RemunerationCreateWithoutEnfantInputObjectSchema } from './RemunerationCreateWithoutEnfantInput.schema';
import { RemunerationUncheckedCreateWithoutEnfantInputObjectSchema } from './RemunerationUncheckedCreateWithoutEnfantInput.schema';
import { RemunerationCreateOrConnectWithoutEnfantInputObjectSchema } from './RemunerationCreateOrConnectWithoutEnfantInput.schema';
import { RemunerationCreateManyEnfantInputEnvelopeObjectSchema } from './RemunerationCreateManyEnfantInputEnvelope.schema';
import { RemunerationWhereUniqueInputObjectSchema } from './RemunerationWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.RemunerationCreateNestedManyWithoutEnfantInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RemunerationCreateWithoutEnfantInputObjectSchema),
          z
            .lazy(() => RemunerationCreateWithoutEnfantInputObjectSchema)
            .array(),
          z.lazy(
            () => RemunerationUncheckedCreateWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () => RemunerationUncheckedCreateWithoutEnfantInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => RemunerationCreateOrConnectWithoutEnfantInputObjectSchema,
          ),
          z
            .lazy(
              () => RemunerationCreateOrConnectWithoutEnfantInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => RemunerationCreateManyEnfantInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => RemunerationWhereUniqueInputObjectSchema),
          z.lazy(() => RemunerationWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RemunerationCreateNestedManyWithoutEnfantInputObjectSchema =
  Schema;
