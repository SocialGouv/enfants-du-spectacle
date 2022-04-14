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
  typeEmploiLabel,
} from "src/lib/helpers";
import type { CommissionData, DossierData } from "src/lib/types";

const generateOdj = (commission: CommissionData) => {
  const doc = new jsPDF();
  const categories = _.uniq(
    _.filter(commission.dossiers, { statut: "PRET" }).map((d: DossierData) => {
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
            fontSize: 15,
            fontStyle: "bold",
            halign: "center",
          },
        },
      ]);
      _.filter(commission.dossiers, (dossier: DossierData) => {
        return dossier.categorie === categorie && dossier.statut === "PRET";
      }).map((dossier: DossierData) => {
        blocs.push([
          {
            content: `\n\nSOCIETE : ${
              dossier.societeProduction.nom
            } \nPROJET : ${dossier.nom} - du ${frenchDateText(
              dossier.dateDebut
            )} au ${frenchDateText(
              dossier.dateFin
            )} \nTYPE DE PROJET : ${categorieToLabel(dossier.categorie)} 
              `,
            styles: {
              fontSize: 15,
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
        roles.map((role: TypeEmploi) => {
          blocs.push([
            {
              content: typeEmploiLabel(role),
              styles: {
                fontSize: 15,
                fontStyle: "bold",
                halign: "left",
              },
            },
          ]);
          _.filter(dossier.enfants, { typeEmploi: role }).map(
            (enfant: Enfant) => {
              blocs.push([
                {
                  content: `${enfant.nom.toUpperCase()} ${enfant.prenom.toUpperCase()}, ${birthDateToFrenchAge(
                    enfant.dateNaissance
                  )} (incarne : ${
                    enfant.nomPersonnage
                      ? enfant.nomPersonnage
                      : "Non Renseigné"
                  } )
                  ${enfant.nombreJours} jours travaillés
                  ${enfant.nombreCachets} cachets de ${
                    enfant.montantCachet
                  } Euros
                  (Rémunérations additionnelles : ${
                    enfant.remunerationsAdditionnelles
                      ? enfant.remunerationTotale
                      : "0"
                  } Euros
                  TOTAL : ${enfant.remunerationTotale} Euros
                  Part CDC : ${enfant.cdc ? enfant.cdc : "0"}%`,
                  styles: {
                    fontSize: 13,
                    halign: "left",
                  },
                },
              ]);
            }
          );
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
    margin: { top: 70 },
    theme: "plain",
  });

  const pageCount = doc.internal.getNumberOfPages(); //Total Page Number
  for (let i = 0; i < pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(15).setFont(undefined, "bold");
    doc.text("Direction Régionale et Interdépartementale", 85, 18);
    doc.text("de l’Economie, de l'Emploi, du Travail", 98, 25);
    doc.text("et des Solidarités d’Ile-de-France", 110, 32);
    const imgData = new Image();
    imgData.src = logoPrefet.src;
    console.log(imgData);
    doc.setFontSize(40);
    doc.addImage(imgData, "png", 15, 15, 50, 45);
  }

  return doc.save(
    "Ordre du jour commission " +
      frenchDateText(commission.date) +
      " - " +
      frenchDepartementName(commission.departement)
  );
};

export { generateOdj };
