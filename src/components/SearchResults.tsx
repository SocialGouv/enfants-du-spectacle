import { Title } from "@dataesr/react-dsfr";
import type { Dossier, Enfant, SocieteProduction, User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import AssignedAgent from "src/components/AssignedAgent";
import styles from "src/components/SearchResults.module.scss";
import StatutDossierTag from "src/components/StatutDossierTag";
import type { SearchResultsType } from "src/lib/queries";

interface EnfantProps {
  enfant: Enfant & {
    dossier: Dossier & {
      user?: User | null;
      societeProduction: SocieteProduction;
    };
  };
}

const EnfantRow: React.FC<EnfantProps> = ({ enfant }) => {
  return (
    <div className={`${styles.enfantGrid} itemGrid`}>
      <div>
        <StatutDossierTag dossier={enfant.dossier} />
      </div>
      <div className={styles.nom}>
        {enfant.prenom} {enfant.nom}
      </div>
      <div>
        <Link href={`/dossiers/${enfant.dossier.id}`}>
          {enfant.dossier.nom}
        </Link>
        <div className={styles.discret}>
          {enfant.dossier.societeProduction.nom}
        </div>
      </div>
      <div>
        <AssignedAgent dossier={enfant.dossier} />
      </div>
    </div>
  );
};

interface DossierProps {
  dossier: Dossier & {
    societeProduction: SocieteProduction;
    user: User | null;
    _count: {
      enfants: number;
    } | null;
  };
}

const DossierRow: React.FC<DossierProps> = ({ dossier }) => {
  return (
    <div className={`${styles.dossierGrid} itemGrid`}>
      <div>
        <StatutDossierTag dossier={dossier} />
      </div>
      <div className={styles.nom}>
        <Link href={`/dossiers/${dossier.id}`}>{dossier.nom}</Link>
      </div>
      <div>{dossier.societeProduction.nom}</div>
      <div>
        <b>{dossier._count?.enfants}</b>&nbsp;enfants
      </div>
      <div>
        <AssignedAgent dossier={dossier} />
      </div>
    </div>
  );
};

interface Props {
  searchResults: SearchResultsType;
}

const SearchResults: React.FC<Props> = ({
  searchResults: { enfants, dossiers },
}) => {
  const enfantsPart = (
    <>
      <Title as="h3">Enfants</Title>
      <div className="card">
        {enfants.length == 0 && <span>aucun enfant trouvé</span>}
        {enfants.length > 0 && (
          <div className="enfantsContainer">
            {enfants.map((enfant) => (
              <EnfantRow key={enfant.id} enfant={enfant} />
            ))}
          </div>
        )}
      </div>
    </>
  );
  const dossiersPart = (
    <>
      <Title as="h3">Dossiers</Title>
      <div className="card">
        {dossiers.length == 0 && <span>aucun dossier trouvé</span>}
        {dossiers.length > 0 && (
          <div className="dossiersContainer">
            {dossiers.map((dossier) => (
              <DossierRow key={dossier.id} dossier={dossier} />
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (enfants.length > 0 && dossiers.length == 0) {
    return (
      <>
        {enfantsPart}
        {dossiersPart}
      </>
    );
  } else {
    return (
      <>
        {dossiersPart}
        {enfantsPart}
      </>
    );
  }
};
export default SearchResults;
