import React from "react";
import styles from "src/components/Info.module.scss";

interface InfoProps {
  title: string;
  className?: string;
}

const Info: React.FC<InfoProps> = ({ title, children, className }) => {
  return (
    <div className={`${styles.info} ${className}`}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Info;
