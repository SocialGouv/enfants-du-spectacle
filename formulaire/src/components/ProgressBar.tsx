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
          background: "#e84c26",
          transition: "width 0.2s ease-in-out",
          //   background: "linear-gradient(0.25turn, #e84c26, #ffe3dc, #e84c26)",
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
