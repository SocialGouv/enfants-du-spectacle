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
  getRemsByDossier,
  REMUNERATIONS,
  STATUS_ODJ,
  typeEmploiLabel,
  TYPES_EMPLOI,
} from "src/lib/helpers";
import type { DossierData } from "src/lib/types";

const generateFE = async (dossiers: DossierData[]) => {
  // Debug data availability
  console.log("DEBUG FE: First dossier:", dossiers[0].id);
  console.log("DEBUG FE: Demandeur exists:", !!dossiers[0].demandeur);
  console.log("DEBUG FE: Demandeur societeProduction exists:", !!dossiers[0].demandeur?.societeProduction);
  console.log("DEBUG FE: Direct societeProduction exists:", !!dossiers[0].societeProduction);
  
  if (dossiers[0].demandeur?.societeProduction) {
    console.log("DEBUG FE: Demandeur societeProduction nom:", dossiers[0].demandeur.societeProduction.nom);
  } else {
    console.log("DEBUG FE: Demandeur societeProduction is not populated");
  }
  
  let rems = await getRemsByDossier(dossiers[0])
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
            content: `\n\nSOCIETE : ${dossier.demandeur?.societeProduction?.nom || dossier.societeProduction?.nom || "N/A"} - ${
              dossier.demandeur?.societeProduction?.adresse || dossier.societeProduction?.adresse || ""
            } ${dossier.demandeur?.societeProduction?.adresseCodePostal || dossier.societeProduction?.adresseCodePostal || ""} ${
              dossier.demandeur?.societeProduction?.adresseCodeCommune || dossier.societeProduction?.adresseCodeCommune || ""
            } \nPROJET : ${dossier.nom || "Sans nom"} - du ${frenchDateText(
              dossier.dateDebut || new Date()
            )} au ${frenchDateText(
              dossier.dateFin || new Date()
            )} \nCATEGORIE : ${categorieToGrandeCategorieLabel(
              dossier.categorie || "AUTRE"
            )} - TYPE DE PROJET : ${categorieToLabel(dossier.categorie || "AUTRE")} 
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
              .sort(function (a, b) {
                if ((a as Enfant).nom < (b as Enfant).nom) {
                  return -1;
                }
                if ((a as Enfant).nom > (b as Enfant).nom) {
                  return 1;
                }
                if ((a as Enfant).prenom < (b as Enfant).prenom) {
                  return -1;
                }
                if ((a as Enfant).prenom > (b as Enfant).prenom) {
                  return 1;
                }
                return 0;
              })
              .map((enfant) => {
                // Ensure enfant is treated as Enfant type
                const typedEnfant = enfant as Enfant;
                // Accès aux rémunérations de l'enfant de manière sécurisée
                // @ts-ignore - La propriété remuneration existe dans la DB mais n'est pas dans le type
                const remEnfant = typedEnfant.remuneration || [];
                console.log(`Rémunérations pour l'enfant ${typedEnfant.id} dans FE:`, remEnfant);
                blocs.push([
                  {
                    content: `${typedEnfant.nom?.toUpperCase()} ${typedEnfant.prenom?.toUpperCase()}, ${birthDateToFrenchAge(
                      typedEnfant.dateNaissance || new Date()
                    )} ${
                      typedEnfant.nomPersonnage
                        ? ", incarne " + typedEnfant.nomPersonnage
                        : ""
                    }${
                      typedEnfant.adresseEnfant
                        ? "\n  Domicile : " + typedEnfant.adresseEnfant
                        : ""
                    }${
                      typedEnfant.nomRepresentant1
                        ? `\n  Représentant légal 1 : ${typedEnfant.nomRepresentant1} ${typedEnfant.prenomRepresentant1} - ${typedEnfant.adresseRepresentant1}`
                        : ""
                    }${
                      typedEnfant.nomRepresentant2
                        ? `\n  Représentant légal 2 : ${typedEnfant.nomRepresentant2} ${typedEnfant.prenomRepresentant2} - ${typedEnfant.adresseRepresentant2}`
                        : ""
                    }
  ${typedEnfant.nombreJours} jours travaillés
  ${typedEnfant.periodeTravail ? `Période: ${typedEnfant.periodeTravail}` : ""}
  ${dossier.source === 'FORM_EDS' ? 
  `Rémunérations garanties : ${REMUNERATIONS[0]["Rémunérations garanties"]?.map((cat) => {
    let remFound = remEnfant.find(rem => rem.natureCachet === cat.value)
    return remFound ? `${remFound.nombre} '${cat.label}' de ${remFound.montant} Euros, ${remFound.totalDadr ? `Montant total DADR : ${remFound.totalDadr} Euros, ` : ''}` : ''
  }).join(' ')}
  Rémunérations additionnelles : ${REMUNERATIONS[1]["Rémunérations additionnelles"]?.map((cat) => {
    let remFound = remEnfant.find(rem => rem.natureCachet === cat.value)
    return remFound ? `${remFound.nombre} '${cat.label === 'Autre' ? remFound.autreNatureCachet : cat.label}' de ${remFound.montant} Euros` : ''
  }).join(' ')}
  TOTAL : ${remEnfant.reduce((acc, cur) => cur.montant && cur.nombre ? acc + (cur.montant * cur.nombre) + (cur.totalDadr ? cur.totalDadr : 0) : acc, 0)} Euros` 
  : 
  `${typedEnfant.nombreCachets} cachets de ${typedEnfant.montantCachet} Euros ${
    typedEnfant.remunerationsAdditionnelles
      ? `\n  Rémunérations additionnelles : ${typedEnfant.remunerationsAdditionnelles}`
      : ""
  }
  TOTAL : ${typedEnfant.remunerationTotale} Euros` }
  Part CDC : ${typedEnfant.cdc ? typedEnfant.cdc : "0"}% 
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
