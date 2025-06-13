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
  state?: boolean;
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
  type,
  updateComments,
}) => {
  const [showContent, setShowContent] = React.useState<boolean>(false);

  useEffect(() => {
    if (state) setShowContent(true);
    else setShowContent(false);
  }, []);

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
        {!showContent ? (
          <AiOutlinePlus
            cursor="pointer"
            color="black"
            onClick={() => {
              setShowContent(true);
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
      {showContent && <div className={styles.content}>{children}</div>}
    </div>
  );
};

export default Accordion;
