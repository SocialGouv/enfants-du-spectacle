import add from "date-fns/add";
import prismaClient from "src/lib/prismaClient";

import type { Commission } from ".prisma/client";

const DATA = [
  {
    date: add(new Date(), { months: 2 }),
    dateLimiteDepot: add(new Date(), { months: 1 }),
    departement: "75",
  },
];

export async function createCommission(idx = 0): Promise<Commission> {
  if (idx > DATA.length - 1) throw Error("not enough data");
  return prismaClient.commission.create({ data: DATA[idx] });
}
