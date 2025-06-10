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
  getRemsByDossier,
  REMUNERATIONS,
  STATUS_ODJ,
  typeEmploiLabel,
  TYPES_EMPLOI,
} from "src/lib/helpers";
import type { CommissionData, DossierData } from "src/lib/types";

const generatePV = async (commission: CommissionData) => {
  const doc = new jsPDF();

  for (const dossier of commission.dossiers) {
    await getRemsByDossier(dossier);
  }

  // Filtrer les dossiers qui sont à l'ordre du jour
  const filteredDossiers = _.filter(commission.dossiers, (dossier: DossierData) => {
    return STATUS_ODJ.includes(dossier.statut);
  });
  
  const categories = _.uniq(
    filteredDossiers.map((d: DossierData) => {
      return categorieToGrandeCategorieLabel(d.categorie || "AUTRE");
    })
  );

  const blocs: RowInput[] = [];

  if (categories.length > 0) {
    for (const categorie of categories) {
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
      
      const categorizedDossiers = _.filter(filteredDossiers, (dossier: DossierData) => {
        return (
          categorieToGrandeCategorieLabel(dossier.categorie || "AUTRE") === categorie
        );
      });
      
      for (const dossier of categorizedDossiers) {
        
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
            )} \nTYPE DE PROJET : ${categorieToLabel(dossier.categorie || "AUTRE")} 
              `,
            styles: {
              fontSize: 13,
              fontStyle: "bold",
              halign: "left",
            },
          },
        ]);
        
        // Récupérer les rôles uniques parmi les enfants du dossier
        const roles = _.uniq(
          dossier.enfants.map((e: Enfant) => {
            return e.typeEmploi;
          })
        );
        
        // Pour chaque type d'emploi possible
        for (const role of TYPES_EMPLOI) {
          // Si ce rôle existe parmi les enfants du dossier
          // @ts-ignore - Erreur de typage entre string et TypeEmploi
          if (roles.includes(role.value)) {
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
            
            // Filtrer et trier les enfants ayant ce rôle
            const sortedEnfants = _.filter(dossier.enfants, { typeEmploi: role.value })
              .sort((a, b) => {
                const aNom = (a as Enfant).nom || '';
                const bNom = (b as Enfant).nom || '';
                const aPrenom = (a as Enfant).prenom || '';
                const bPrenom = (b as Enfant).prenom || '';
                
                if (aNom < bNom) return -1;
                if (aNom > bNom) return 1;
                if (aPrenom < bPrenom) return -1;
                if (aPrenom > bPrenom) return 1;
                return 0;
              });
            
            // Pour chaque enfant avec ce rôle
            for (const enfant of sortedEnfants) {
              const typedEnfant = enfant as any;
              
              // === CODE COPIÉ DE pdfGenerateFE.ts QUI FONCTIONNE ===
              // Accès aux rémunérations de l'enfant de manière sécurisée
              const remEnfant = typedEnfant.remuneration || [];
              
              let remunerationsContent = '';
              
              // Utiliser exactement le même code que dans pdfGenerateFE.ts
              if (dossier.source === 'FORM_EDS') {
                remunerationsContent = `Rémunérations garanties : ${REMUNERATIONS[0]["Rémunérations garanties"]?.map((cat) => {
                  let remFound = remEnfant.find(rem => rem.natureCachet === cat.value)
                  return remFound ? `${remFound.nombre} '${cat.label}' de ${remFound.montant} Euros, ${remFound.totalDadr ? `Montant total DADR : ${remFound.totalDadr} Euros, ` : ''}` : ''
                }).join(' ')}
  Rémunérations additionnelles : ${REMUNERATIONS[1]["Rémunérations additionnelles"]?.map((cat) => {
                  let remFound = remEnfant.find(rem => rem.natureCachet === cat.value)
                  return remFound ? `${remFound.nombre} '${cat.label === 'Autre' ? remFound.autreNatureCachet : cat.label}' de ${remFound.montant} Euros` : ''
                }).join(' ')}
  TOTAL : ${remEnfant.reduce((acc, cur) => cur.montant && cur.nombre ? acc + (cur.montant * cur.nombre) + (cur.totalDadr ? cur.totalDadr : 0) : acc, 0)} Euros`;
              } else {
                remunerationsContent = `${typedEnfant.nombreCachets || 0} cachets de ${typedEnfant.montantCachet || 0} Euros${
                  typedEnfant.remunerationsAdditionnelles
                    ? `\n  Rémunérations additionnelles : ${typedEnfant.remunerationsAdditionnelles}`
                    : ""
                }\n  TOTAL : ${typedEnfant.remunerationTotale || 0} Euros`;
              }
              
              blocs.push([
                {
                  content: `${(typedEnfant.nom || '').toUpperCase()} ${(typedEnfant.prenom || '').toUpperCase()}, ${birthDateToFrenchAge(
                    typedEnfant.dateNaissance || new Date()
                  )} ${
                    typedEnfant.nomPersonnage
                      ? ", incarne " + typedEnfant.nomPersonnage
                      : ""
                  }
  ${typedEnfant.nombreJours || 0} jours travaillés
  ${typedEnfant.periodeTravail ? `Période: ${typedEnfant.periodeTravail}` : ""}
  ${remunerationsContent}
  Part CDC : ${typedEnfant.cdc ? typedEnfant.cdc : "0"}%`,
                  styles: {
                    fontSize: 11,
                    halign: "left",
                  },
                },
              ]);
            }
          }
        }
        
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
      }
    }
  }

  // Département pour l'affichage du PV
  const departement = commission.departement || "75";
  
  autoTable(doc, {
    body: [
      [
        {
          content:
            "Procès verbal commission des enfants du spectacle" +
            "\n" +
            frenchDateText(commission.date) +
            " - " +
            // @ts-ignore - On ignore l'erreur TypeScript
            frenchDepartementName(departement),
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

  // @ts-ignore - La méthode getNumberOfPages existe dans jsPDF mais TypeScript ne la reconnaît pas
  const pageCount = doc.internal.getNumberOfPages(); //Total Page Number
  for (let i = 0; i < pageCount; i++) {
    doc.setPage(i);
    if (i === 1) {
      doc.setFontSize(15).setFont(undefined, "bold");
      doc.text("Direction Régionale et Interdépartementale", 85, 18);
      doc.text("de l'Economie, de l'Emploi, du Travail", 98, 25);
      doc.text("et des Solidarités d'Ile-de-France", 110, 32);
      const imgData = new Image();
      imgData.src = logoPrefet.src;
      doc.setFontSize(40);
      // @ts-ignore - La méthode addImage existe dans jsPDF mais TypeScript ne reconnaît pas tous les paramètres
      doc.addImage(imgData, "png", 15, 15, 50, 45);
    }
  }

  return doc.save(
    "Procès Verbal commission " +
      frenchDateText(commission.date) +
      " - " +
      // @ts-ignore - On ignore l'erreur TypeScript
      frenchDepartementName(departement)
  );
};

export { generatePV };
