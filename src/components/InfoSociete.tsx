import type { SocieteProduction } from "@prisma/client";
import React from "react";
import {
  getConventionLabel,
  getConventionLegifranceUrl,
} from "src/lib/conventionsCollectives";

interface Props {
  societeProduction: SocieteProduction;
}

const InfoSociete: React.FC<Props> = ({
  societeProduction: {
    nom,
    raisonSociale,
    formeJuridique,
    adresse,
    siret,
    conventionCollectiveCode,
    naf,
    siren,
  },
}) => {
  const conventionStr = `CCN ${conventionCollectiveCode} (${getConventionLabel(
    conventionCollectiveCode
  )})`;
  const conventionLegifranceUrl = getConventionLegifranceUrl(
    conventionCollectiveCode
  );

  return (
    <>
      <div>{nom}</div>
      <div>Dénomination : {raisonSociale}</div>
      <div>{formeJuridique}</div>
      <div>{adresse}</div>
      <div>SIRET {siret}</div>
      <div>
        {conventionLegifranceUrl ? (
          <a href={conventionLegifranceUrl} target="_blank" rel="noreferrer">
            {conventionStr}
          </a>
        ) : (
          <>{conventionStr}</>
        )}
      </div>
      <div>NAF {naf}</div>
      <div>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://annuaire-entreprises.data.gouv.fr/entreprise/${siren}`}
        >
          Plus dʼinformations…
        </a>
      </div>
    </>
  );
};

export default InfoSociete;
