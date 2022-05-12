import { Callout, CalloutText, CalloutTitle, Title } from "@dataesr/react-dsfr";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import { frenchDepartementName } from "src/lib/helpers";

import styles from "../components/Commission.module.scss";

const Download: React.FC = () => {
  const router = useRouter();
  const { elementId } = router.query;
  const [submitting, setSubmitting] = React.useState(false);
  const [docName, setDocName] = React.useState("");
  const [urlDoc, setUrlDoc] = React.useState("");
  const [mountedRef, setMountedRef] = React.useState<boolean>(false);

  useEffect(() => {
    setMountedRef(true);
  });

  useEffect(() => {
    if (elementId !== undefined) {
      window
        .fetch(`api/commissions/${elementId}`)
        .then(async (r) => {
          return r.json();
        })
        .then((r) => {
          const com = r.json;
          setDocName(
            `commission_${frenchDepartementName(
              (com.departement as string) || ""
            )}_${new Date(com.date as Date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}`
          );
          setUrlDoc(
            `/api/docs?zipname=${`commission_${frenchDepartementName(
              (com.departement as string) || ""
            )}_${new Date(com.date as Date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}`}`
          );
        })
        .catch((e) => {
          console.log(e);
        });
    }
    if (submitting) {
      setTimeout(() => {
        signOut({
          callbackUrl: "https://enfants-du-spectacle.fabrique.social.gouv.fr/",
        }).catch((e) => {
          console.log(e);
        });
      }, 5000);
    }
  }, [mountedRef, submitting, elementId]);

  return (
    <Layout windowTitle="">
      <div className="card">
        <Title as="h2">Téléchargement</Title>
        <Callout>
          <CalloutTitle as="h3">Interface téléchargement</CalloutTitle>
          <CalloutText>
            {submitting && <IconLoader />} Vous pouvez cliquer sur le bouton
            ci-dessous pour télécharger votre dossier. <br />
            Une fois le teléchargement effectué vous serez redirigé sur la page
            d&apos;accueil Enfants du spectacle.
          </CalloutText>
          {
            <div className={styles.downloadLink}>
              <a
                href={urlDoc}
                className="postButton"
                download={docName + ".zip"}
                onClick={() => {
                  setSubmitting(true);
                }}
              >
                Télécharger dossiers
              </a>
            </div>
          }
          <div style={{ marginTop: "2rem" }}>
            <Link href="https://beta.gouv.fr/startups/enfants-du-spectacle.html">
              Plus d&apos;informations sur le service ↗
            </Link>
          </div>
        </Callout>
      </div>
    </Layout>
  );
};

export default Download;
