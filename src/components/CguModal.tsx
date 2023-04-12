import React from "react";
import styles from "src/components/CguModal.module.scss";

interface Props {
  component: JSX.Element;
}

const Cgu: React.FC<Props> = ({ component }) => {
  return <div className={styles.cguModal}>{component}</div>;
};

export default Cgu;
