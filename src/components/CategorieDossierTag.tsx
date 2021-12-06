import type { Dossier } from "@prisma/client";
import React from "react";
import {
  categorieToGrandeCategorieClassName,
  categorieToGrandeCategorieLabel,
  categorieToLabel,
} from "src/lib/categories";

import styles from "./CategorieDossierTag.module.scss";

interface Props {
  dossier: Dossier;
  onlyGrandeCategorie?: boolean;
}

const CategorieDossierTag: React.FC<Props> = ({
  dossier,
  onlyGrandeCategorie,
}) => {
  const categorieClass = categorieToGrandeCategorieClassName(dossier.categorie);
  return (
    <div className={`${styles.tag} ${styles[categorieClass]}`}>
      <div className={styles.grandeCategorie}>
        {categorieToGrandeCategorieLabel(dossier.categorie)}
      </div>
      {!onlyGrandeCategorie && <div>{categorieToLabel(dossier.categorie)}</div>}
    </div>
  );
};

export default CategorieDossierTag;
