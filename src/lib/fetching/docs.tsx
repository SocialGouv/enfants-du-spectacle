import { JustificatifEnfant } from "@prisma/client";

const uploadDoc = async (data: FormData, dossierId: string, enfantId: string, typeJustif?: JustificatifEnfant): Promise<{filePath: string}> => {
    const url = `/api/sync/out/docs?dossierId=${dossierId}&typeJustif=${typeJustif}&enfantId=${enfantId}`;
    const fetching = await fetch(url, {
        body: data,
        method: "POST"
    }).then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching;
};

export { uploadDoc }