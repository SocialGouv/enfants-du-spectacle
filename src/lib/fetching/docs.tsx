import { JustificatifEnfant } from "@prisma/client";

const uploadDoc = async (
  data: FormData,
  dossierId: number,
  enfantId: number,
  typeJustif?: JustificatifEnfant
): Promise<{ filePath: string; pieceId: number }> => {
  //const url = `/api/sync/out/docs?dossierId=${dossierId}&typeJustif=${typeJustif}&enfantId=${enfantId}`;
  const url = `${process.env.NEXT_PUBLIC_API_URL_SDP}/inc/upload?id=${dossierId}&typeJustif=${typeJustif}&enfantId=${enfantId}`;
  const fetching = await fetch(url, {
    body: data,
    method: "POST",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching;
};
const deleteDoc = async (docId: number) => {
  const url = `/api/sync/out/docs?id=${docId}`;
  const fetching = await fetch(url, {
    body: JSON.stringify(docId),
    method: "DELETE",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  return fetching;
};

const uploadDecisionToS3 = async (
  pdfBase64: string,
  dossierId: number,
  fileName: string,
  enfantId?: number
): Promise<{ s3Url: string; s3Key: string }> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL_SDP}/inc/upload-decision`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pdfBase64,
      dossierId,
      fileName,
      enfantId, // Passer enfantId pour que l'API sache si c'est une décision individuelle
    }),
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  
  return response;
};

export { uploadDoc, deleteDoc, uploadDecisionToS3 };
