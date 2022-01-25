import { Link } from "@dataesr/react-dsfr";
import React, { useState } from "react";

import styles from "./Foldable.module.scss";

interface Props {
  onlyOnce: boolean;
  hidden: boolean;
}

const Foldable: React.FC<Props> = ({ children, onlyOnce, hidden }) => {
  const [folded, setFolded] = useState(true);
  return (
    <div>
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
              setFolded(!folded);
            }}
          >
            {folded ? "Afficher plus d'informations…" : "Cacher…"}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Foldable;
