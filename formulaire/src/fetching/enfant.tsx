import { Enfant } from "@prisma/client";


const createEnfant = async (enfant: Omit<Enfant, "id">) => {
    const url = "/api/enfants";
    const fetching = await fetch(url, {
        body: JSON.stringify(enfant),
        method: "POST",
    }).then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as Enfant;
};

const updateEnfant = async (enfant: Enfant) => {
    const fetching = await fetch(`/api/enfants`, {
        body: JSON.stringify(enfant),
        method: "PUT",
    }).then(async (r) => {
        if (!r.ok) {
        throw Error(`got status ${r.status}`);
        }
        return r.json();
    });
    return fetching as Enfant;
};


export { createEnfant, updateEnfant }