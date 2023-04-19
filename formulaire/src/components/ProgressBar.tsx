import React, { useState } from "react";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const [barWidth, setBarWidth] = useState(0);

  React.useEffect(() => {
    setBarWidth(progress);
  }, [progress]);

  return (
    <div className={styles.progressBar}>
      <div
        style={{
          width: `${barWidth}%`,
          maxWidth: "100%",
          height: "10px",
          backgroundColor: "#e84c26",
          transition: "width 0.2s ease-in-out",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
