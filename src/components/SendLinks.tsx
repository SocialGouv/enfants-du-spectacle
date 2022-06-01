import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import styles from "src/components/ConnexionForm.module.scss";
import IconLoader from "src/components/IconLoader";
import { searchUsers } from "src/lib/api";
import { frenchDateHour } from "src/lib/helpers";
import type { CommissionData } from "src/lib/queries";
import { updateCommission } from "src/lib/queries";

interface Props {
  commission: CommissionData;
}

const SendLinks: React.FC<Props> = ({ commission }) => {
  const [commissionTmp, setCommission] =
    React.useState<CommissionData>(commission);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [mountedRef, setMountedRef] = React.useState(false);
  const { callbackUrl } = router.query;
  const { protocol, host } = window.location;
  const defaultCallbackUrl = `${protocol}//${host}/download?type=secured_download_dl_commission&elementId=${commission.id}`;

  const submitSigninForm = (email: string) => {
    setSubmitting(true);
    signIn("email", {
      callbackUrl: (callbackUrl as string) || defaultCallbackUrl,
      email,
      redirect: false,
    }).catch((err) => {
      setSubmitting(false);
      window.alert("Une erreur est survenue lors de votre connexion");
      throw err;
    });
  };

  const handleSend = async () => {
    setSubmitting(true);
    const users = await searchUsers(commission.departement);
    users.map((user) => {
      submitSigninForm(user.email ?? "");
    });
    setCommission({
      ...commission,
      lastSent: new Date(),
    });
    setSubmitting(false);
  };

  React.useEffect(() => {
    setMountedRef(true);
  });

  React.useEffect(() => {
    if (mountedRef) {
      updateCommission(commissionTmp);
    }
  }, [commissionTmp]);

  return (
    <div>
      <button
        className="whiteButton"
        onClick={() => {
          handleSend().catch((e) => {
            console.log(e);
          });
        }}
      >
        {submitting && <IconLoader className={styles.iconLoader} />} Envoyer
        dossiers
      </button>
      {commissionTmp.lastSent && (
        <p>
          <br />
          Dossiers envoyés le : <br />
          {frenchDateHour(commissionTmp.lastSent)}
        </p>
      )}
    </div>
  );
};

export default SendLinks;
