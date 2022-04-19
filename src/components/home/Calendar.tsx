import { Container, Select } from "@dataesr/react-dsfr";
import type { Commission } from "@prisma/client";
import Image from "next/image";
import * as React from "react";
import styles from "src/components/home/Calendar.module.scss";
import calendar from "src/images/calendar.png";
import { useDatesCommissions } from "src/lib/api";
import {
  ALL_DEPARTEMENTS,
  frenchDateText,
  frenchDepartementName,
} from "src/lib/helpers";

const Calendar: React.FC = () => {
  const { commissions, ...swrCommissions } = useDatesCommissions();
  const [commissionsFiltered, setFilteredCommissions] = React.useState<
    Commission[]
  >([]);
  const isError = swrCommissions.isError || !commissions;

  const [formData, setFormData] = React.useState<Commission>({
    date: new Date(),
    dateLimiteDepot: new Date(),
    departement: "",
    id: 1,
  });

  const [displayCalendar, setDisplayCalendar] = React.useState(false);

  interface Option {
    label: string | null;
    value: string;
  }

  const defaultDepartement: Option = {
    label: "Sélectionnez le département",
    value: "",
  };

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.id]: e.currentTarget.value,
    });
  };

  const showCalendar = () => {
    if (formData.departement !== "") {
      setDisplayCalendar(true);
      setFilteredCommissions(
        commissions?.filter((commission) => {
          return commission.departement === formData.departement;
        }) ?? []
      );
    }
  };

  return (
    <section className={styles.calendarSection}>
      <Container>
        <div className={styles.calendarGrid}>
          <div className={styles.leftColumn}>
            <Image src={calendar} alt="Illustration calendrier" />
          </div>

          <div className={styles.rightColumn}>
            <h3>CALENDRIER</h3>
            <h2>Les prochaines commissions</h2>
            <p>
              Chaque dossier nécessite entre 3 et 5 semaines d&apos;instruction.
            </p>
            <p>Pensez à déposer votre dossier suffisament à l&apos;avance.</p>
            <p className={styles.pushTop}>Le département</p>
            <p className={styles.smallGrey}>
              Celui du siège social de la société
            </p>
            <div className={styles.selectDepartement}>
              <Select
                id="departement"
                name="departement"
                selected={formData.departement ? formData.departement : ""}
                options={[defaultDepartement].concat(
                  ALL_DEPARTEMENTS.map((u) => ({
                    key: u,
                    label: frenchDepartementName(u),
                    value: u,
                  }))
                )}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleForm(event);
                }}
              />
            </div>

            <div className={styles.rowButtons}>
              <button className="whiteButton" onClick={showCalendar}>
                Voir le calendrier
              </button>
              <a
                href="https://www.demarches-simplifiees.fr/commencer/enfants-du-spectacle"
                className="postButton"
              >
                <span>Déposer un dossier</span>
              </a>
            </div>
            {commissions?.map((commission) => {
              <span key={commission.id}>{commission.departement} test</span>;
            })}

            {displayCalendar && (
              <div className={styles.calendar}>
                <div className={styles.calendarRow}>
                  <div className={styles.left}>
                    <b>Date limite de dépôt de dossier</b>
                  </div>
                  <div className={styles.right}>
                    <b>Date de la commission</b>
                  </div>
                </div>
                {!isError &&
                  commissionsFiltered.map((commission) => (
                    <div className={styles.calendarRow} key={commission.id}>
                      <div className={styles.left}>
                        {frenchDateText(commission.dateLimiteDepot)}
                      </div>
                      <div className={styles.right}>
                        {frenchDateText(commission.date)}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Calendar;
