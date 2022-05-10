import type { Commission, Dossier } from "@prisma/client";
import Link from "next/link";
import React from "react";
import DatePicker from "react-datepicker";
import AddCommission from "src/components/AddCommission";
import { frenchDateHour, frenchDepartementName } from "src/lib/helpers";
import { createCommission, removeCommission } from "src/lib/queries";
import styles from "src/styles/commissions.module.scss";

type CommissionWithCounts = Commission & {
  dossiers: (Dossier & {
    _count: {
      enfants: number;
    } | null;
  })[];
};

interface Props {
  commissions: CommissionWithCounts[];
}

interface RowProps {
  commission: CommissionWithCounts;
  deleteCommission: (e: React.FormEvent, id: number) => void;
}

const CommissionRow: React.FC<RowProps> = ({
  commission,
  deleteCommission,
}) => {
  const dossiersCount = commission.dossiers.length;
  const [dates, setDates] = React.useState<Date[]>([
    commission.date,
    commission.dateLimiteDepot,
  ]);
  const [changeDates, setChangeDates] = React.useState<boolean[]>([
    false,
    false,
  ]);

  return (
    <div className={`${styles.row} card`}>
      <div>
        {changeDates[0] ? (
          <span>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={commission.date}
              className="inputText"
              onChange={(date: Date) => {
                console.log("ok good");
                setDates([date, dates[1]]);
                setChangeDates([!changeDates[0], changeDates[1]]);
              }}
            />
          </span>
        ) : (
          <span>
            <span role="img" aria-label="hammer">
              🔨
            </span>{" "}
            <b>{frenchDateHour(dates[0])}</b> -{" "}
            {frenchDepartementName(commission.departement)}
            <br />
            <button
              onClick={() => {
                setChangeDates([!changeDates[0], changeDates[1]]);
              }}
            >
              Modifier
            </button>
          </span>
        )}
      </div>
      <div>
        <b>{dossiersCount}</b> dossiers
      </div>
      <div>
        limite dépôt : <b>{frenchDateHour(commission.dateLimiteDepot)}</b>
      </div>
      <div>
        <Link href={`/commissions/create`}>
          <a
            href={`/commissions/create`}
            className={styles.seeDossiers}
            onClick={(e: React.ChangeEvent<HTMLInputElement>) => {
              deleteCommission(e, commission.id);
            }}
          >
            Supprimer la commission
          </a>
        </Link>
      </div>
    </div>
  );
};

const Commissions: React.FC<Props> = ({ commissions }) => {
  const [commissionList, setCommissionList] =
    React.useState<CommissionWithCounts[]>(commissions);

  const deleteCommission = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    const commissionListTmp: CommissionWithCounts[] = commissionList.filter(
      (commission: CommissionWithCounts) => commission.id !== id
    );
    setCommissionList(commissionListTmp);
    removeCommission(id);
  };

  const addCommission = (e: React.FormEvent, formData: Commission) => {
    e.preventDefault();
    formData.dateLimiteDepot.setHours(23);
    formData.dateLimiteDepot.setMinutes(59);
    const commission: CommissionWithCounts = {
      date: new Date(formData.date),
      dateLimiteDepot: new Date(formData.dateLimiteDepot),
      departement: formData.departement,
      dossiers: [],
    };
    createCommission({
      date: commission.date,
      dateLimiteDepot: commission.dateLimiteDepot,
      departement: commission.departement,
      lastSent: null,
    });
    setCommissionList([commission, ...commissionList]);
  };

  return (
    <>
      <AddCommission saveCommission={addCommission} />
      {commissionList.map((commission) => (
        <CommissionRow
          key={commission.id ? commission.id.toString() : `"tmp"`}
          commission={commission}
          deleteCommission={deleteCommission}
        />
      ))}
    </>
  );
};

export default Commissions;
