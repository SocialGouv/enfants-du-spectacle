import type { SocieteProduction } from "@prisma/client";
import React from "react";
import Foldable from "src/components/Foldable";
import {
  getConventionLabel,
  getConventionLegifranceUrl,
} from "src/lib/conventionsCollectives";

interface Props {
  societeProduction: SocieteProduction;
  conventionCollectiveCode: string | null;
}

const InfoSociete: React.FC<Props> = ({
  societeProduction: {
    nom,
    raisonSociale,
    formeJuridique,
    adresse,
    adresseCodeCommune,
    siret,
    naf,
    siren,
  },
  conventionCollectiveCode,
}) => {
  const conventionStr = `CCN ${conventionCollectiveCode} (${getConventionLabel(
    conventionCollectiveCode ?? "missing"
  )})`;
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
