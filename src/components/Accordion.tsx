import * as React from "react";
import { useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "src/components/Accordion.module.scss";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
  state?: boolean;
}

const Accordion: React.FC<Props> = ({ title, children, className, state }) => {
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
              setShowContent(true);
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
