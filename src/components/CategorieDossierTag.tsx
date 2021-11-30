import type { TagSize } from "@dataesr/react-dsfr";
import { Tag } from "@dataesr/react-dsfr";
import type { Dossier } from "@prisma/client";
import React from "react";
import {
  categorieToGrandeCategorieClassName,
  categorieToGrandeCategorieLabel,
} from "src/lib/categories";

import styles from "./CategorieDossierTag.module.scss";

interface Props {
  dossier: Dossier;
  size?: TagSize;
}

const CategorieDossierTag: React.FC<Props> = ({ dossier, size }) => {
  const categorieClass = categorieToGrandeCategorieClassName(dossier.categorie);
  return (
    <Tag className={`${styles.tag} ${styles[categorieClass]}`} size={size}>
      {categorieToGrandeCategorieLabel(dossier.categorie)}
    </Tag>
  );
};

export default CategorieDossierTag;
