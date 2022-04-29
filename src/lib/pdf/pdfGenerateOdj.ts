import type { CategorieDossier, Enfant, TypeEmploi } from "@prisma/client";
import { jsPDF } from "jspdf";
import type { RowInput } from "jspdf-autotable";
import autoTable from "jspdf-autotable";
import _ from "lodash";
import logoPrefet from "src/images/logo_prefet.png";
import {
  categorieToGrandeCategorieLabel,
  categorieToLabel,
} from "src/lib/categories";
import {
  birthDateToFrenchAge,
  frenchDateText,
  frenchDepartementName,
  STATUS_ODJ,
  typeEmploiLabel,
  TYPES_EMPLOI,
} from "src/lib/helpers";
import type { CommissionData, DossierData } from "src/lib/types";

const generateOdj = (commission: CommissionData) => {
  const doc = new jsPDF();
  const categories = _.uniq(
    _.filter(commission.dossiers, (dossier: DossierData) => {
      return STATUS_ODJ.includes(dossier.statut);
    }).map((d: DossierData) => {
      return d.categorie;
    })
  );

  const blocs: RowInput[] = [];

  if (categories.length > 0) {
    categories.map((categorie: CategorieDossier) => {
      blocs.push([
        {
          content: ` \n CATÉGORIE : ${categorieToGrandeCategorieLabel(
            categorie
          )}`,
          styles: {
            fontSize: 13,
            fontStyle: "bold",
            halign: "center",
          },
        },
      ]);
      _.filter(commission.dossiers, (dossier: DossierData) => {
        return (
          dossier.categorie === categorie && STATUS_ODJ.includes(dossier.statut)
        );
      }).map((dossier: DossierData) => {
        blocs.push([
          {
            content: `\n\nSOCIETE : ${dossier.societeProduction.nom}  - ${
              dossier.societeProduction.adresse
            } ${dossier.societeProduction.adresseCodePostal} ${
              dossier.societeProduction.adresseCodeCommune
            } \nPROJET : ${dossier.nom} - du ${frenchDateText(
              dossier.dateDebut
            )} au ${frenchDateText(
              dossier.dateFin
            )} \nTYPE DE PROJET : ${categorieToLabel(dossier.categorie)} 
              `,
            styles: {
              fontSize: 13,
              fontStyle: "bold",
              halign: "left",
            },
          },
        ]);
        const roles = _.uniq(
          dossier.enfants.map((e: Enfant) => {
            return e.typeEmploi;
          })
        );
        TYPES_EMPLOI.map((role) => {
          if (roles.indexOf(role.value) !== -1) {
            blocs.push([
              {
                content: typeEmploiLabel(role.value as TypeEmploi),
                styles: {
                  fontSize: 13,
                  fontStyle: "bold",
                  halign: "left",
                },
              },
            ]);
            _.filter(dossier.enfants, { typeEmploi: role.value })
              .sort(function (
                a: Record<string, string>,
                b: Record<string, string>
              ) {
                if (a.nom < b.nom) {
                  return -1;
                }
                if (a.nom > b.nom) {
                  return 1;
                }
                if (a.prenom < b.prenom) {
                  return -1;
                }
                if (a.prenom > b.prenom) {
                  return 1;
                }
                return 0;
              })
              .map((enfant: Enfant) => {
                blocs.push([
                  {
                    content: `${enfant.nom.toUpperCase()} ${enfant.prenom.toUpperCase()}, ${birthDateToFrenchAge(
                      enfant.dateNaissance
                    )} ${
                      enfant.nomPersonnage
                        ? ", incarne " + enfant.nomPersonnage
                        : ""
                    }
  ${enfant.nombreJours} jours travaillés
  ${enfant.periodeTravail ? `Période: ${enfant.periodeTravail}` : ""}
  ${enfant.nombreCachets} cachets de ${enfant.montantCachet} Euros ${
                      enfant.remunerationsAdditionnelles
                        ? `\n  Rémunérations additionnelles : ${enfant.remunerationsAdditionnelles}`
                        : ""
                    }
  TOTAL : ${enfant.remunerationTotale} Euros
  Part CDC : ${enfant.cdc ? enfant.cdc : "0"}%`,
                    styles: {
                      fontSize: 11,
                      halign: "left",
                    },
                  },
                ]);
              });
          }
        });
      });
    });
  }

  autoTable(doc, {
    body: [
      [
        {
          content:
            "Ordre du jour de la commission des enfants du spectacle" +
            "\n" +
            frenchDateText(commission.date) +
            " - " +
            frenchDepartementName(commission.departement),
          styles: {
            fontSize: 13,
            halign: "center",
          },
        },
      ],
    ],
    margin: { top: 70 },
    theme: "plain",
  });

  autoTable(doc, {
    body: [...blocs],
    theme: "plain",
  });

  const pageCount = doc.internal.getNumberOfPages(); //Total Page Number
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    if (i === 1) {
      doc.setFontSize(15).setFont(undefined, "bold");
      doc.text("Direction Régionale et Interdépartementale", 85, 18);
      doc.text("de l’Economie, de l'Emploi, du Travail", 98, 25);
      doc.text("et des Solidarités d’Ile-de-France", 110, 32);
      const imgData = new Image();
      imgData.src = logoPrefet.src;
      doc.setFontSize(40);
      doc.addImage(imgData, "png", 15, 15, 50, 45);
    }
    doc.setFontSize(10);
    doc.text(
      "Page " + String(i) + " sur " + String(pageCount),
      210 - 20,
      317 - 30,
      null,
      null,
      "right"
    );
  }

  return doc.save(
    "Ordre du jour commission " +
      frenchDateText(commission.date) +
      " - " +
      frenchDepartementName(commission.departement)
  );
};

export { generateOdj };
