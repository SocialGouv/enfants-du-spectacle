import { Title } from "@dataesr/react-dsfr";
import React from "react";
import styles from "src/components/SearchResults.module.scss";
import StatutProjetTag from "src/components/StatutProjetTag";
import { shortUserName } from "src/lib/helpers";
import type { SearchResultsType } from "src/lib/queries";

import type { Enfant, Projet, SocieteProduction, User } from ".prisma/client";

interface EnfantProps {
  enfant: Enfant & { projet: Projet & { user?: User | null } };
}

const EnfantRow: React.FC<EnfantProps> = ({ enfant }) => {
  return (
    <tr className={styles.row}>
      <td>
        <StatutProjetTag projet={enfant.projet} />
      </td>
      <td className={styles.nom}>
        {enfant.prenom} {enfant.nom}
      </td>
      <td>{enfant.projet.nom}</td>
      <td>{enfant.projet.user && shortUserName(enfant.projet.user)}</td>
    </tr>
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
    <tr className={styles.row}>
      <td>
        <StatutProjetTag projet={projet} />
      </td>
      <td className={styles.nom}>{projet.nom}</td>
      <td>{projet.societeProduction.nom}</td>
      <td>
        <b>{projet._count?.enfants}</b>&nbsp;enfants
      </td>
      <td>{projet.user && shortUserName(projet.user)}</td>
    </tr>
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
      <Title as="h3">Enfants</Title>
      <div className="card">
        {enfants.length == 0 && <span>aucun enfant trouvé</span>}
        {enfants.length > 0 && (
          <table className="cardTable">
            <tbody>
              {enfants.map((enfant) => (
                <EnfantRow key={enfant.id} enfant={enfant} />
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Title as="h3">Projets</Title>
      <div className="card">
        {projets.length == 0 && <span>aucun projet trouvé</span>}
        {projets.length > 0 && (
          <table className="cardTable">
            <tbody>
              {projets.map((projet) => (
                <ProjetRow key={projet.id} projet={projet} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default SearchResults;
