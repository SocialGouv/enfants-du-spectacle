import { Title } from "@dataesr/react-dsfr";
import Link from "next/link";
import React from "react";
import AssignedAgent from "src/components/AssignedAgent";
import styles from "src/components/SearchResults.module.scss";
import StatutProjetTag from "src/components/StatutProjetTag";
import type { SearchResultsType } from "src/lib/queries";

import type { Enfant, Projet, SocieteProduction, User } from ".prisma/client";

interface EnfantProps {
  enfant: Enfant & {
    projet: Projet & {
      user?: User | null;
      societeProduction: SocieteProduction;
    };
  };
}

const EnfantRow: React.FC<EnfantProps> = ({ enfant }) => {
  return (
    <div className={`${styles.enfantGrid} itemGrid`}>
      <div>
        <StatutProjetTag projet={enfant.projet} />
      </div>
      <div className={styles.nom}>
        {enfant.prenom} {enfant.nom}
      </div>
      <div>
        <Link href={`/dossiers/${enfant.projet.id}`}>{enfant.projet.nom}</Link>
        <div className={styles.discret}>
          {enfant.projet.societeProduction.nom}
        </div>
      </div>
      <div>
        <AssignedAgent projet={enfant.projet} />
      </div>
    </div>
  );
};

interface ProjetProps {
  projet: Projet & {
    societeProduction: SocieteProduction;
    user: User | null;
    _count: {
      enfants: number;
    } | null;
  };
}

const ProjetRow: React.FC<ProjetProps> = ({ projet }) => {
  return (
    <div className={`${styles.projetGrid} itemGrid`}>
      <div>
        <StatutProjetTag projet={projet} />
      </div>
      <div className={styles.nom}>
        <Link href={`/dossiers/${projet.id}`}>{projet.nom}</Link>
      </div>
      <div>{projet.societeProduction.nom}</div>
      <div>
        <b>{projet._count?.enfants}</b>&nbsp;enfants
      </div>
      <div>
        <AssignedAgent projet={projet} />
      </div>
    </div>
  );
};

interface Props {
  searchResults: SearchResultsType;
}

const SearchResults: React.FC<Props> = ({
  searchResults: { enfants, projets },
}) => {
  return (
    <>
      <Title as="h3">Projets</Title>
      <div className="card">
        {projets.length == 0 && <span>aucun projet trouvé</span>}
        {projets.length > 0 && (
          <div className="projetsContainer">
            {projets.map((projet) => (
              <ProjetRow key={projet.id} projet={projet} />
            ))}
          </div>
        )}
      </div>
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
};
export default SearchResults;
