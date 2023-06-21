import { Enfant } from "@prisma/client";
import * as React from "react";
import { useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "src/components/Accordion.module.scss";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
  state?: boolean;
  type?: string;
  enfant: Enfant;
  selectedEnfant: Enfant | undefined; 
  updateComments?: (type: string) => void;
  action: (enfant: Enfant) => void;
}

const Accordion: React.FC<Props> = ({
  title,
  children,
  className,
  state,
  type,
  enfant,
  selectedEnfant,
  updateComments,
  action
}) => {
  const [showContent, setShowContent] = React.useState<boolean>(false);

  useEffect(() => {
    setShowContent(enfant.id === selectedEnfant?.id)
  }, [selectedEnfant]);

  return (
    <div
      className={`${styles.accordion} ${className} ${styles.accordionBorder}`}
    >
      <div className={styles.wrapper}>
        <div
          className={
            className === "accordionSmallText"
              ? styles.accordionSmallText
              : styles.title
          }
        >
          {title}
        </div>
        {!showContent ? (
          <AiOutlinePlus
            cursor="pointer"
            color="black"
            onClick={() => {
              action(enfant)
              if (type === "commentChildren" && updateComments) {
                updateComments("children");
              }
            }}
          />
        ) : (
          <AiOutlineMinus
            cursor="pointer"
            color="black"
            onClick={() => {
              setShowContent(false);
            }}
          />
        )}
      </div>
      {showContent && (
        <div className={styles.content}>
          {children}{" "}
          <div onClick={() => setShowContent(false)} className={styles.hideBtn}>
            Cacher...
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
