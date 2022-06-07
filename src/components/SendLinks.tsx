import type { SendList } from "@prisma/client";
import _ from "lodash";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import IconLoader from "src/components/IconLoader";
import styles from "src/components/SendLinks.module.scss";
import { searchUsers } from "src/lib/api";
import {
  createSendList,
  getSendList,
  updateSendList,
} from "src/lib/fetching/sendlist";
import type { CommissionData } from "src/lib/queries";
import type { SendListData } from "src/lib/types";

interface Props {
  commission: CommissionData;
}

const SendLinks: React.FC<Props> = ({ commission }) => {
  React.useState<CommissionData>(commission);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [checkingList, setCheckingList] = useState(true);
  const [mountedRef, setMountedRef] = React.useState(false);
  const [SendList, setSendList] = useState<SendListData[]>([]);
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
    const sendlist = await getSendList(commission.id);
    sendlist
      .filter((sl) => {
        return sl.send;
      })
      .map(async (sl) => {
        submitSigninForm(sl.user.email ?? "");
        sl.lastSent = new Date();
        await updateSendList(sl);
      });
    setSendList(sendlist);
    setSubmitting(false);
  };

  const handleList = async () => {
    setCheckingList(!checkingList);
    if (checkingList) {
      // get user list with corresponding departement
      const users = await searchUsers(commission.departement);
      // get sendlist
      const sendlist = await getSendList(commission.id);
      setSendList(sendlist);
      // add user to sendlist if not found
      users
        .filter((user) => {
          return _.map(sendlist, "userId").indexOf(user.id) === -1;
        })
        .map(async (user) => {
          const sendList: Omit<SendList, "id"> = {
            commissionId: commission.id,
            lastSent: null,
            send: false,
            userId: user.id,
          };
          const sendCreated = await createSendList(sendList);
          sendCreated.user = user;
          setSendList((OldSendList) => [...OldSendList, sendCreated]);
        });
    }
  };

  React.useEffect(() => {
    if (mountedRef) {
      console.log("sendlist = ", SendList);
    }
  }, [SendList]);

  React.useEffect(() => {
    setMountedRef(true);
  }, []);

  return (
    <div id="send_links">
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
      <br />
      <div
        onClick={handleList}
        onKeyDown={handleList}
        role="button"
        tabIndex={0}
        className={styles.emailList}
      />
    </div>
  );
};

export default SendLinks;
