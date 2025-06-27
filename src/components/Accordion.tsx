import * as React from "react";
import { useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "src/components/Accordion.module.scss";

interface Props {
  title: string;
  updatedAt?: Date;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  
  // Props pour le mode autonome (existant)
  state?: boolean;
  
  // Props pour le mode contrôlé (nouveau)
  isOpen?: boolean;
  onToggle?: () => void;
  
  // Props spécifiques
  type?: string;
  updateComments?: (type: string) => void;
}

const Accordion: React.FC<Props> = ({
  title,
  updatedAt,
  subtitle,
  children,
  className,
  state,
  isOpen,
  onToggle,
  type,
  updateComments,
}) => {
  const [showContent, setShowContent] = React.useState<boolean>(false);

  // Détermine si on est en mode contrôlé ou autonome
  const isControlled = isOpen !== undefined && onToggle !== undefined;
  const isContentVisible = isControlled ? isOpen : showContent;

  useEffect(() => {
    if (!isControlled) {
      if (state) setShowContent(true);
      else setShowContent(false);
    }
  }, [state, isControlled]);

  const handleToggle = () => {
    if (isControlled) {
      onToggle();
    } else {
      setShowContent(!showContent);
    }
  };

  return (
    <div
      className={`${styles.accordion} ${className} ${styles.accordionBorder}`}
    >
      <div className={styles.wrapper}>
        <div className={styles.mainTitles}>
          <div
            className={
              className === "accordionSmallText"
                ? styles.accordionSmallText
                : styles.title
            }
          >
            {title}
          </div>
          <div className={styles.subtitle}>{subtitle ? subtitle : ""}</div>
        </div>
        {!isContentVisible ? (
          <AiOutlinePlus
            cursor="pointer"
            color="black"
            onClick={() => {
              handleToggle();
              if (type === "commentChildren" && updateComments) {
                updateComments("children");
              }
            }}
          />
        ) : (
          <AiOutlineMinus
            cursor="pointer"
            color="black"
            onClick={handleToggle}
          />
        )}
      </div>
      {isContentVisible && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Accordion;
