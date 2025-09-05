import React from "react";
import styles from "./StepGuide.module.scss";

interface StepGuideProps {
  stepNumber: number;
  title: string;
  children: React.ReactNode;
  isCompleted?: boolean;
  isActive?: boolean;
}

const StepGuide: React.FC<StepGuideProps> = ({
  stepNumber,
  title,
  children,
  isCompleted = false,
  isActive = false
}) => {
  return (
    <div className={`${styles.step} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}>
      <div className={styles.stepHeader}>
        <div className={styles.stepNumber}>
          {isCompleted ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                fill="white"
              />
            </svg>
          ) : (
            stepNumber
          )}
        </div>
        <h3 className={styles.stepTitle}>{title}</h3>
      </div>
      <div className={styles.stepContent}>
        {children}
      </div>
    </div>
  );
};

export default StepGuide;
