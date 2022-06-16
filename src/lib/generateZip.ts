import type { Enfant } from "@prisma/client";
import fs from "fs";
import JSZip from "jszip";
import _ from "lodash";
import { categorieToLabel } from "src/lib/categories";
import { getConventionLabel } from "src/lib/conventionsCollectives";
import { frenchDepartementName, TYPES_EMPLOI } from "src/lib/helpers";

import type { CommissionData, DossierData } from "./types";

/*function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}*/

export default (commission: CommissionData) => {
  const zip = new JSZip();

  _.forEach(
    commission.dossiers,
    (dossier: DossierData & { files: unknown[] }) => {
      const dossierFolder = zip.folder(
        dossier.nom.replace(".", "_").replace("'", "_")
      );

      const roles = _.uniq(
        dossier.enfants.map((e: Enfant) => {
          return e.typeEmploi;
        })
      );

      dossierFolder?.file(
        dossier.nom + ".txt",
        `Statut: ${dossier.statut} \r\n
Nom: ${dossier.nom} \r\n
Catégorie: ${categorieToLabel(dossier.categorie)} \r\n
Société de production: ${dossier.societeProduction.nom} \r\n
Adresse société de production: ${dossier.societeProduction.adresse}, ${
          dossier.societeProduction.adresseCodeCommune
        } \r\n
Siret Société production : ${dossier.societeProduction.siret} \r\n
Convention collective: ${
          dossier.conventionCollectiveCode
        } (${getConventionLabel(
          dossier.conventionCollectiveCode ?? "missing"
        )}) \r\n
${
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  dossier.demandeur
    ? `Nom demandeur : ${dossier.demandeur.prenom} ${dossier.demandeur.prenom} \r\n`
    : ""
}
${
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  dossier.demandeur ? `Email demandeur : ${dossier.demandeur.email} \r\n` : ""
}
${
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  dossier.demandeur
    ? `Téléphone demandeur : ${dossier.demandeur.phone} \r\n`
    : ""
}
${
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  dossier.demandeur
    ? `Fonction demandeur : ${dossier.demandeur.fonction} \r\n`
    : ""
}
Présentation: ${dossier.presentation} \r\n${
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          dossier.scenesSensibles.length > 0 &&
          dossier.scenesSensibles[0] !== ""
            ? `Scènes sensibles: ${dossier.scenesSensibles} \r\n`
            : ``
        }
Date de début: ${new Date(dossier.dateDebut).toLocaleDateString("fr")} \r\n
Date de fin: ${new Date(dossier.dateFin).toLocaleDateString("fr")} \r\n
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
                `Enfant: ${enfant.prenom} ${enfant.nom} \r\n
Date de naissance: ${new Date(enfant.dateNaissance).toLocaleDateString(
                  "fr"
                )} \r\n
Type d'emploi: ${role.label} \r\n
${enfant.nomPersonnage ? `Nom du personnage ${enfant.nomPersonnage} \r\n` : ""}
${
  enfant.periodeTravail ? `Période de travail: ${enfant.periodeTravail}` : ""
} \r\n
Nombre de jours: ${enfant.nombreJours} \r\n
Temps et lieu de travail: ${enfant.contexteTravail} \r\n
Montant cachet: ${enfant.montantCachet} \r\n
Nombre de cachets: ${enfant.nombreCachets} \r\n
${enfant.nombreLignes ? `Nombre de lignes: ${enfant.nombreLignes}` : ""} \r\n
${
  enfant.remunerationsAdditionnelles
    ? `Rémunération additionnelle: ${enfant.remunerationsAdditionnelles}`
    : ""
} \r\n
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

  zip
    .generateNodeStream({ streamFiles: true, type: "nodebuffer" })
    .pipe(
      fs.createWriteStream(
        `/mnt/docs/commission_${frenchDepartementName(
          commission.departement
        )}_${new Date(commission.date).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}.zip`
      )
    )
    .on("finish", function () {
      // JSZip generates a readable stream with a "end" event,
      // but is piped here in a writable stream which emits a "finish" event.
      console.log("commission.zip written.");
    });

  /*const zipAsBase64 = await zip.generateAsync({ type: "base64" });*/

  return "success";
};
