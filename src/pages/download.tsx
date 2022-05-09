import { Callout, CalloutText, CalloutTitle, Title } from "@dataesr/react-dsfr";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
import Layout from "src/components/Layout";
import { useCommission } from "src/lib/api";
import { downloadDocs } from "src/lib/queries";

const Download: React.FC = () => {
  const router = useRouter();
  const { commission, ...swrCommission } = useCommission(
    typeof router.query.elementId == "string"
      ? Number(router.query.elementId)
      : null
  );
  const isLoading = swrCommission.isLoading;
  const isError = !isLoading && (swrCommission.isError || !commission);
  const [mountedRef, setMountedRef] = React.useState<boolean>(false);

  useEffect(() => {
    setMountedRef(true);
  });

  useEffect(() => {
    if (mountedRef) {
      const { type } = router.query;
      if (type === "dl_commission" && commission) {
        downloadDocs(commission)
          .then(() => {
            setTimeout(() => {
              signOut({ callbackUrl: "google.fr" }).catch((e) => {
                console.log(e);
              });
            }, 5000);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [mountedRef, isError, isLoading]);

  return (
    <Layout windowTitle="">
      <div className="card">
        <Title as="h2">Téléchargement</Title>
        <Callout>
          <CalloutTitle as="h3">Interface téléchargement</CalloutTitle>
          <CalloutText>
            Votre téléchargement va débuter automatiquement d&apos;ici quelques
            instants. <br />
            Une fois le teléchargement effectué vous serez redirigé sur la page
            d&apos;accueil Enfants du spectacle.
          </CalloutText>
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
