import React from "react";
import styles from "src/components/FilterBarText.module.scss";
import type { CommissionData, SearchResultsType } from "src/lib/queries";

interface Props {
  searchResults: SearchResultsType | null;
  commissions: CommissionData[];
}

const FilterBarText: React.FC<Props> = ({ searchResults, commissions }) => {
  if (searchResults) {
    return (
      <>
        Filtrer les{" "}
        <span className={styles.count}>
          {searchResults.dossiers.length} dossiers
        </span>{" "}
        et{" "}
        <span className={styles.count}>
          {searchResults.enfants.length} enfants
        </span>
      </>
    );
  } else {
    return (
      <>
        Filtrer les{" "}
        <span className={styles.count}>
          {commissions.map((c) => c.dossiers.length).reduce((a, b) => a + b, 0)}{" "}
          dossiers{" "}
        </span>
      </>
    );
  }
};

export default FilterBarText;
