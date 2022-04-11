import { Container } from "@dataesr/react-dsfr";
import Image from "next/image";
import * as React from "react";
import styles from "src/components/home/Steps.module.scss";
import vector_bottom_1 from "src/images/vector_bottom_1.png";
import vector_bottom_2 from "src/images/vector_bottom_2.png";
import vector_top_1 from "src/images/vector_top_1.png";
import vector_top_2 from "src/images/vector_top_2.png";

const Steps: React.FC = () => {
  return (
    <section className={styles.stepsSection}>
      <Container>
        <h2>Les étapes de ma démarche</h2>
        <div className={styles.vectorsTop}>
          <div className={styles.vectorBox} />
          <div className={styles.vectorBox}>
            <Image src={vector_top_1} alt="Illustration calendrier" />
          </div>
          <div className={styles.vectorBox}>
            <Image src={vector_top_2} alt="Illustration calendrier" />
          </div>
        </div>
        <div className={styles.stepsGrid}>
          <div className={styles.stepGrid}>
            <p className={styles.number}>1</p>
            <p>
              <span>
                Je <b>réunis les pièces</b> de mon dossier{" "}
              </span>{" "}
            </p>
          </div>
          <div className={styles.stepGrid}>
            <p className={styles.number}>2</p>
            <p>
              <span>
                Je rempmlis mon <b>formulaire</b> en ligne
              </span>{" "}
            </p>
          </div>
          <div className={styles.stepGrid}>
            <p className={styles.number}>3</p>
            <p>
              {" "}
              <span>
                Je <b>reçois par mail</b> un lien qui me permet de consulter mon
                dosier à tout moment
              </span>{" "}
            </p>
          </div>
          <div className={styles.stepGrid}>
            <p className={styles.number}>4</p>
            <p>
              <span>
                Je peux <b>mopdifier mon dossier</b> avant son passage en
                instruction
              </span>{" "}
            </p>
          </div>
          <div className={styles.stepGrid}>
            <p className={styles.number}>5</p>
            <p>
              <span>
                Après la commission, <b>je reçois ma décision</b>
              </span>
            </p>
          </div>
        </div>
        <div className={styles.vectorsBottom}>
          <div className={styles.vectorBox}>
            <Image src={vector_bottom_1} alt="Illustration calendrier" />
          </div>
          <div className={styles.vectorBox}>
            <Image src={vector_bottom_2} alt="Illustration calendrier" />
          </div>
          <div className={styles.vectorBox} />
        </div>
      </Container>
    </section>
  );
};

export default Steps;
