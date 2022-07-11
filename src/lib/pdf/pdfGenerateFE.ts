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
  STATUS_ODJ,
  typeEmploiLabel,
  TYPES_EMPLOI,
} from "src/lib/helpers";
import type { DossierData } from "src/lib/types";

const generateFE = (dossiers: DossierData[]) => {
  const doc = new jsPDF();
  const categories = _.uniq(
    _.filter(dossiers, (dossier: DossierData) => {
      return STATUS_ODJ.includes(dossier.statut);
    }).map((d: DossierData) => {
      return d.categorie;
    })
  );

  const blocs: RowInput[] = [];

  if (categories.length > 0) {
    categories.map((categorie: CategorieDossier) => {
      _.filter(dossiers, (dossier: DossierData) => {
        return (
          dossier.categorie === categorie && STATUS_ODJ.includes(dossier.statut)
        );
      }).map((dossier: DossierData) => {
        blocs.push([
          {
            content: `\n\nSOCIETE : ${dossier.societeProduction.nom} - ${
              dossier.societeProduction.adresse
            } ${dossier.societeProduction.adresseCodePostal} ${
              dossier.societeProduction.adresseCodeCommune
            } \nPROJET : ${dossier.nom} - du ${frenchDateText(
              dossier.dateDebut
            )} au ${frenchDateText(
              dossier.dateFin
            )} \nCATEGORIE : ${categorieToGrandeCategorieLabel(
              dossier.categorie
            )} - TYPE DE PROJET : ${categorieToLabel(dossier.categorie)} 
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
                    }${
                      enfant.adresseEnfant
                        ? "\n  Domicile : " + enfant.adresseEnfant
                        : ""
                    }${
                      enfant.nomRepresentant1
                        ? `\n  Représentant légal 1 : ${enfant.nomRepresentant1} ${enfant.prenomRepresentant1} - ${enfant.adresseRepresentant1}`
                        : ""
                    }${
                      enfant.nomRepresentant2
                        ? `\n  Représentant légal 2 : ${enfant.nomRepresentant2} ${enfant.prenomRepresentant2} - ${enfant.adresseRepresentant2}`
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
  Part CDC : ${enfant.cdc ? enfant.cdc : "0"}% 
  |_| Favorable        |_| Favorable sous réserve          |_| Ajourné          |_| Défavorable 
  Motifs : \n \n`,
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
          content: "FICHE EMPLOI",
          styles: {
            fontSize: 15,
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

  //doc.addPage();

  autoTable(doc, {
    body: [
      [
        {
          content: "Secrétariat de la commission",
          styles: {
            fontSize: 11,
            halign: "center",
          },
        },
        {
          content: "Présidence de la commission",
          styles: {
            fontSize: 11,
            halign: "left",
          },
        },
      ],
    ],
    theme: "plain",
  });

  const pageCount = doc.internal.getNumberOfPages(); //Total Page Number
  for (let i = 0; i <= pageCount; i++) {
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
  }

  return doc.save("FICHE_EMPLOI_" + dossiers[0].nom.replaceAll(".", "_"));
};

export { generateFE };
