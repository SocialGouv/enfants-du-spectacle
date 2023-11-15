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
  getRemunerations,
  REMUNERATIONS,
  STATUS_ODJ,
  typeEmploiLabel,
  TYPES_EMPLOI,
} from "src/lib/helpers";
import type { CommissionData, DossierData } from "src/lib/types";

const generatePV = async (commission: CommissionData) => {
  let rems = await getRemunerations(commission)
  const doc = new jsPDF();
  const categories = _.uniq(
    _.filter(commission.dossiers, (dossier: DossierData) => {
      return STATUS_ODJ.includes(dossier.statut);
    }).map((d: DossierData) => {
      return categorieToGrandeCategorieLabel(d.categorie);
    })
  );

  const blocs: RowInput[] = [];

  if (categories.length > 0) {
    categories.map((categorie: CategorieDossier) => {
      blocs.push([
        {
          content: ` \n CATÉGORIE : ${categorie}`,
          styles: {
            fontSize: 13,
            fontStyle: "bold",
            halign: "center",
          },
        },
      ]);
      _.filter(commission.dossiers, (dossier: DossierData) => {
        return (
          categorieToGrandeCategorieLabel(dossier.categorie) === categorie &&
          STATUS_ODJ.includes(dossier.statut)
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
                let remEnfant = rems.filter(rem => rem.enfantId?.toString() === enfant.externalId)
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
  ${dossier.source === 'FORM_EDS' ? 
  `Rémunérations garanties : ${REMUNERATIONS[0]["Rémunérations garanties"]?.map((cat) => {
    let remFound = remEnfant.find(rem => rem.natureCachet === cat.value)
    return remFound ? `${remFound.nombre} '${cat.label}' de ${remFound.montant} Euros, ${remFound.totalDadr ? `Montant total DADR : ${remFound.totalDadr} Euros, ` : ''}` : ''
  }).join(' ')}
  Rémunérations additionnelles : ${REMUNERATIONS[1]["Rémunérations additionnelles"]?.map((cat) => {
    let remFound = remEnfant.find(rem => rem.natureCachet === cat.value)
    return remFound ? `${remFound.nombre} '${cat.label === 'Autre' ? remFound.autreNatureCachet : cat.label}' de ${remFound.montant} Euros` : ''
  }).join(' ')}
  TOTAL : ${remEnfant.reduce((acc, cur) => cur.montant && cur.nombre ? acc + (cur.montant * cur.nombre) + (cur.totalDadr ? cur.totalDadr : 0) : acc, 0)} Euros` : 
  `${enfant.nombreCachets} cachets de ${enfant.montantCachet} Euros ${
    enfant.remunerationsAdditionnelles
      ? `\n  Rémunérations additionnelles : ${enfant.remunerationsAdditionnelles}`
      : ""
  }
  TOTAL : ${enfant.remunerationTotale} Euros`}
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
        blocs.push([
          {
            content:
              " \nAVIS:   |_| Favorable    |_| Favorable sous réserve     |_| Ajourné     |_| Défavorable",
            styles: {
              fontSize: 13,
              halign: "left",
            },
          },
        ]);
        blocs.push([
          {
            content: " \nMotifs \n\n\n\n\n\n\n",
            styles: {
              fontSize: 13,
              fontStyle: "bold",
              halign: "left",
            },
          },
        ]);
      });
    });
  }

  autoTable(doc, {
    body: [
      [
        {
          content:
            "Procès verbal commission des enfants du spectacle" +
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
      [
        {
          content: "Membres présents : \n\n\n\n",
          styles: {
            fontSize: 13,
            halign: "left",
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
    margin: { top: 70 },
    theme: "plain",
  });

  const pageCount = doc.internal.getNumberOfPages(); //Total Page Number
  for (let i = 0; i < pageCount; i++) {
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

  return doc.save(
    "Procès Verbal commission " +
      frenchDateText(commission.date) +
      " - " +
      frenchDepartementName(commission.departement)
  );
};

export { generatePV };
