import { Icon } from "@dataesr/react-dsfr";
import React from "react";

import styles from "./IconLoader.module.scss";

interface Props {
  className?: string;
}

const IconLoader: React.FC<Props> = ({ className }) => {
  return (
    <Icon
      name="ri-loader-line"
      className={`${styles.icon} ${className ? className : ""}`}
    />
  );
};
export default IconLoader;
