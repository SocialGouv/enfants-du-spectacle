import { Link } from "@dataesr/react-dsfr";
import React, { useState } from "react";

import styles from "./FoldableItem.module.scss";
import ActionBar from "./home/ActionBar";

interface Props {
    children: React.ReactNode
  onlyOnce?: boolean;
  hidden: boolean;
  text?: string;
  folded: boolean;
  action: () => void;
}

const Foldable: React.FC<Props> = ({ children, onlyOnce, hidden, text, folded, action }) => {
  return (
    <div className={styles.foldableItem}>
      <div
        className={`${styles.content} ${folded ? styles.contentFolded : ""} ${
          folded && hidden ? styles.contentFoldedHidden : ""
        }`}
      >
        {children}
      </div>
      {(!onlyOnce || folded) && (
        <div>
          <Link
            onClick={() => {
              action()
            }}
          >
            {folded
              ? text
                ? text
                : "Afficher plus d'informations…"
              : "Cacher…"}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Foldable;