import type { CategorieDossier, Enfant, TypeEmploi } from "@prisma/client";
import { jsPDF } from "jspdf";
import type { RowInput } from "jspdf-autotable";
import autoTable from "jspdf-autotable";
import _ from "lodash";
import logoPrefet from "src/images/logo_prefet.png";
import { categorieToLabel } from "src/lib/categories";
import {
  birthDateToFrenchAge,
  frenchDateText,
  typeEmploiLabel,
} from "src/lib/helpers";
import type { DossierData } from "src/lib/types";

const generateFE = (dossiers: DossierData[]) => {
  const doc = new jsPDF();
  const categories = _.uniq(
    _.filter(dossiers, { statut: "PRET" }).map((d: DossierData) => {
      return d.categorie;
    })
  );

  const blocs: RowInput[] = [];

  if (categories.length > 0) {
    categories.map((categorie: CategorieDossier) => {
      _.filter(dossiers, (dossier: DossierData) => {
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
        roles.map((role: TypeEmploi) => {
          blocs.push([
            {
              content: typeEmploiLabel(role),
              styles: {
                fontSize: 13,
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
                  )} ${
                    enfant.nomPersonnage
                      ? ", incarne : " + enfant.nomPersonnage
                      : ""
                  }${
                    enfant.adresseEnfant
                      ? "\nDomicile : " + enfant.adresseEnfant
                      : ""
                  }${
                    enfant.nomRepresentant1
                      ? `\nReprésentant légal 1 : ${enfant.nomRepresentant1} ${enfant.prenomRepresentant1} - ${enfant.adresseRepresentant1}`
                      : ""
                  }${
                    enfant.nomRepresentant2
                      ? `\nReprésentant légal 2 : ${enfant.nomRepresentant2} ${enfant.prenomRepresentant2} - ${enfant.adresseRepresentant2}`
                      : ""
                  }
${enfant.nombreJours} jours travaillés
${enfant.nombreCachets} cachets de ${enfant.montantCachet} Euros ${
                    enfant.remunerationsAdditionnelles
                      ? `\nRémunérations additionnelles : ${enfant.remunerationsAdditionnelles} Euros`
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
    margin: { top: 70 },
    theme: "plain",
  });

  //doc.addPage();

  autoTable(doc, {
    body: [
      [
        {
          content: "AVIS",
          styles: {
            fontSize: 13,
            fontStyle: "bold",
            halign: "left",
          },
        },
        {
          content: "|_| Favorable",
          styles: {
            fontSize: 11,
            halign: "left",
          },
        },
        {
          content: "|_| Favorable sous réserve",
          styles: {
            fontSize: 11,
            halign: "left",
          },
        },
        {
          content: "|_| Ajourné",
          styles: {
            fontSize: 11,
            halign: "left",
          },
        },
        {
          content: "|_| Défavorable",
          styles: {
            fontSize: 11,
            halign: "left",
          },
        },
      ],
      [
        {
          content: "Motifs \n\n\n\n\n\n\n",
          styles: {
            fontSize: 13,
            fontStyle: "bold",
            halign: "left",
          },
        },
      ],
    ],
    margin: { bottom: 100, top: 70 },
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
    doc.setFontSize(15).setFont(undefined, "bold");
    doc.text("Direction Régionale et Interdépartementale", 85, 18);
    doc.text("de l’Economie, de l'Emploi, du Travail", 98, 25);
    doc.text("et des Solidarités d’Ile-de-France", 110, 32);
    const imgData = new Image();
    imgData.src = logoPrefet.src;
    doc.setFontSize(40);
    doc.addImage(imgData, "png", 15, 15, 50, 45);
  }

  return doc.save("FICHE EMPLOI " + dossiers[0].nom);
};

export { generateFE };
