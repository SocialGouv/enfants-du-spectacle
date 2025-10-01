import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./FaqAccordion.module.scss";

interface FaqAccordionProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  category?: string;
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({
  title,
  children,
  isOpen = false,
  category
}) => {
  const [showContent, setShowContent] = useState<boolean>(isOpen);

  return (
    <div className={styles.accordion}>
      <div 
        className={styles.header}
        onClick={() => setShowContent(!showContent)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setShowContent(!showContent);
          }
        }}
      >
        <div className={styles.titleWrapper}>
          {category && <span className={styles.category}>{category}</span>}
          <h3 className={styles.title}>{title}</h3>
        </div>
        <div className={styles.icon}>
          {showContent ? (
            <AiOutlineMinus size={20} />
          ) : (
            <AiOutlinePlus size={20} />
          )}
        </div>
      </div>
      {showContent && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
};

export default FaqAccordion;
