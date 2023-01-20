
const uploadDoc = async (data: FormData, dossierId: number): Promise<{filePath: string}> => {
    const url = `/api/docs/${dossierId}`;
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