import type { Enfant } from "@prisma/client";
import JSZip from "jszip";
import _ from "lodash";
import { categorieToLabel } from "src/lib/categories";
import { getConventionLabel } from "src/lib/conventionsCollectives";
import { TYPES_EMPLOI } from "src/lib/helpers";

import type { CommissionData, DossierData } from "./types";

/*function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}*/

export default async (commission: CommissionData) => {
  const zip = new JSZip();

  _.forEach(
    commission.dossiers,
    (dossier: DossierData & { files: unknown[] }) => {
      const dossierFolder = zip.folder(dossier.nom);

      const roles = _.uniq(
        dossier.enfants.map((e: Enfant) => {
          return e.typeEmploi;
        })
      );

      dossierFolder?.file(
        dossier.nom + ".txt",
        `Nom: ${dossier.nom} \n
Statut: ${dossier.statut} \n
Catégorie: ${categorieToLabel(dossier.categorie)} \n
Société de production: ${dossier.societeProduction.nom} \n
Adresse société de production: ${dossier.societeProduction.adresse}, ${
          dossier.societeProduction.adresseCodeCommune
        } \n
Siret Société production : ${dossier.societeProduction.siret} \n
Convention collective: ${
          dossier.conventionCollectiveCode
        } (${getConventionLabel(
          dossier.conventionCollectiveCode ?? "missing"
        )}) \n
${
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  dossier.demandeur
    ? `Nom demandeur : ${dossier.demandeur.prenom} ${dossier.demandeur.prenom} \n`
    : ""
}
${
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  dossier.demandeur ? `Email demandeur : ${dossier.demandeur.email} \n` : ""
}
${
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  dossier.demandeur ? `Téléphone demandeur : ${dossier.demandeur.phone} \n` : ""
}
${
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  dossier.demandeur
    ? `Fonction demandeur : ${dossier.demandeur.fonction} \n`
    : ""
}
Présentation: ${dossier.presentation} \n
${
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  dossier.scenesSensibles ? `Scènes sensibles: ${dossier.scenesSensibles}` : ``
} \n
Date de début: ${new Date(dossier.dateDebut).toLocaleDateString("fr")} \n
Date de fin: ${new Date(dossier.dateFin).toLocaleDateString("fr")} \n
`
      );

      dossier.files.map((file) => {
        const indexChar = (file.file.filename.indexOf(".") as number) + 1;
        dossierFolder?.file(
          `${file.label}.${file.file.filename.substring(indexChar)}`,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          file?.doc
        );
      });

      TYPES_EMPLOI.map((role) => {
        if (roles.indexOf(role.value) !== -1) {
          const roleFolder = dossierFolder?.folder(role.label);
          _.filter(dossier.enfants, { typeEmploi: role.value }).map(
            (enfant: Enfant & { files: unknown[] }) => {
              const enfantFolder = roleFolder?.folder(
                enfant.prenom + " " + enfant.nom
              );
              enfantFolder?.file(
                enfant.prenom + " " + enfant.nom + ".txt",
                `Enfant: ${enfant.prenom} ${enfant.nom} \n
Date de naissance: ${new Date(enfant.dateNaissance).toLocaleDateString("fr")} \n
Type d'emploi: ${role.label} \n
${enfant.nomPersonnage ? `Nom du personnage ${enfant.nomPersonnage} \n` : ""}
${
  enfant.periodeTravail ? `Période de travail: ${enfant.periodeTravail}` : ""
} \n
Nombre de jours: ${enfant.nombreJours} \n
Temps et lieu de travail: ${enfant.contexteTravail} \n
Montant cachet: ${enfant.montantCachet} \n
Part cdc : ${enfant.cdc ? enfant.cdc : 0}% \n
Nombre de cachets: ${enfant.nombreCachets} \n
${enfant.nombreLignes ? `Nombre de lignes: ${enfant.nombreLignes}` : ""} \n
${
  enfant.remunerationsAdditionnelles
    ? `Rémunération additionnelle: ${enfant.remunerationsAdditionnelles}`
    : ""
} \n
Rémunération totale: ${enfant.remunerationTotale}
`
              );
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              if (enfant.files !== undefined) {
                enfant.files.map((file) => {
                  if (file.doc !== null) {
                    const indexChar =
                      (file.file.filename.indexOf(".") as number) + 1;
                    enfantFolder?.file(
                      `${file.label}.${file.file.filename.substring(
                        indexChar
                      )}`,
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                      file?.doc
                    );
                  }
                });
              }
            }
          );
        }
      });
    }
  );

  const zipAsBase64 = await zip.generateAsync({ type: "base64" });

  return zipAsBase64;
};
