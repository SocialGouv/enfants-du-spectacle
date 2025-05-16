import type { SocieteProduction } from "@prisma/client";
import React from "react";
import Foldable from "src/components/Foldable";
import {
  getConventionLabel,
  getConventionLegifranceUrl,
} from "src/lib/conventionsCollectives";

interface Props {
  societeProduction: SocieteProduction | null;
  conventionCollectiveCode: string | null;
  otherConventionCollective?: string | null;
}

const InfoSociete: React.FC<Props> = ({
  societeProduction,
  conventionCollectiveCode,
  otherConventionCollective,
}) => {
  // Check for null societeProduction (should not happen anymore with the mock object)
  if (!societeProduction) {
    return <div>Aucune information sur la société de production</div>;
  }

  // Extract properties with safe defaults - double check for properties
  const nom = societeProduction.nom !== undefined && societeProduction.nom !== null 
    ? societeProduction.nom 
    : 'Non spécifié';
  const raisonSociale = societeProduction.raisonSociale !== undefined && societeProduction.raisonSociale !== null
    ? societeProduction.raisonSociale
    : 'Non spécifié';
  const formeJuridique = societeProduction.formeJuridique !== undefined && societeProduction.formeJuridique !== null
    ? societeProduction.formeJuridique
    : 'Non spécifié';
  const adresse = societeProduction.adresse !== undefined && societeProduction.adresse !== null
    ? societeProduction.adresse
    : 'Non spécifié';
  const adresseCodeCommune = societeProduction.adresseCodeCommune !== undefined && societeProduction.adresseCodeCommune !== null
    ? societeProduction.adresseCodeCommune
    : 'Non spécifié';
  const siret = societeProduction.siret !== undefined && societeProduction.siret !== null
    ? societeProduction.siret
    : 'Non spécifié';
  const naf = societeProduction.naf !== undefined && societeProduction.naf !== null
    ? societeProduction.naf
    : 'Non spécifié';
  const siren = societeProduction.siren !== undefined && societeProduction.siren !== null
    ? societeProduction.siren
    : 'Non spécifié';
  const conventionStr = `CCN ${conventionCollectiveCode} 
  (${
    conventionCollectiveCode !== "0000"
      ? `${getConventionLabel(conventionCollectiveCode ?? "missing")}`
      : otherConventionCollective
  })`;
  const conventionLegifranceUrl = getConventionLegifranceUrl(
    conventionCollectiveCode ?? "missing"
  );

  return (
    <Foldable onlyOnce={true}>
      {nom}
      <br />
      Dénomination : {raisonSociale}
      <br />
      {formeJuridique}
      <br />
      {adresse}
      <br />
      {adresseCodeCommune}
      <br />
      SIRET {siret}
      <br />
      {conventionLegifranceUrl ? (
        <a href={conventionLegifranceUrl} target="_blank" rel="noreferrer">
          {conventionStr}
        </a>
      ) : (
        <>{conventionStr}</>
      )}
      <br />
      NAF {naf}
      <br />
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://annuaire-entreprises.data.gouv.fr/entreprise/${siren}`}
      >
        Fiche entreprise
      </a>
      <br />
    </Foldable>
  );
};

export default InfoSociete;
