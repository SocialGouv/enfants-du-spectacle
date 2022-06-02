import type { SendList } from "@prisma/client";
import type { SendListData } from "src/lib/types";

const getSendList = async (commissionId: number | null) => {
  const fetching = await fetch(`/api/sendlist?commissionId=${commissionId}`, {
    method: "GET",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching.json as SendListData[];
};

const createSendList = async (sendlist: Omit<SendList, "id">) => {
  const fetching = await fetch(`/api/sendlist`, {
    body: JSON.stringify(sendlist),
    method: "POST",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching.json as SendListData;
};

const updateSendList = async (sendlist: Omit<SendList, "id">) => {
  const fetching = await fetch(`/api/sendlist`, {
    body: JSON.stringify(sendlist),
    method: "PUT",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching.json as SendListData;
};

export { createSendList, getSendList, updateSendList };
