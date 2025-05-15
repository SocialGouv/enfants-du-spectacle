import { Icon, Title } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import React from "react";
import { FaHome } from "react-icons/fa";
import Dossier from "src/components/Dossier";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import { useRefreshLinks, useDossier } from "src/lib/api";
import { updateDossier } from "src/lib/queries";
import { useSWRConfig } from "swr";

const Page: React.FC = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const dossierId =
    typeof router.query.id == "string" ? Number(router.query.id) : null;
  const { dossier, ...swrDossier } = useDossier(dossierId);

  // Safe extraction of identifier for links
  const dossierId1 = dossier?.number ? dossier.number.toString() : undefined;
  const dossierId2 = dossier?.externalId ?? undefined;
  const dossierIdentifier = dossierId1 || dossierId2 || "";
  const source = dossier?.source || "FORM_DS";
  
  const { ...swrLinks } = useRefreshLinks(dossierIdentifier, source);

  // Check loading states and prevent rendering with incomplete data
  const isLoading = swrDossier.isLoading || (dossier?.source === "FORM_EDS" && swrLinks.isLoading);
  
  // Prevent displaying an error for DS dossiers due to missing links
  const isError =
    !isLoading &&
    (swrDossier.isError || 
     !dossierId || 
     !dossier || 
     (dossier.source === "FORM_EDS" && swrLinks.isError));

  if (dossier && dossier.statusNotification !== null) {
    const statusNotification = null;
    mutate(
      `/api/dossiers/${dossier.id}`,
      { ...dossier, statusNotification },
      false
    ).catch((e) => {
      throw e;
    });
    updateDossier(dossier, { statusNotification }, () => {
      mutate(`/api/dossiers/${dossier.id}`).catch((e) => {
        throw e;
      });
    });
  }

  const title = (
    <>
      <Title as="h1">{dossier?.nom ?? <IconLoader />}</Title>
    </>
  );

  return (
    <Layout
      windowTitle={dossier?.nom ?? "Dossier"}
      headerMiddle={title}
      breadcrumbs={[
        { href: "/dossiers", icon: <FaHome />, label: "Dossiers" },
        { label: dossier?.nom ?? "Dossier" },
      ]}
    >
      {isLoading && <IconLoader />}
      {isError && <Icon name="ri-error" />}
      {!isLoading && !isError && dossierId && (
        <Dossier dossierId={dossierId} dataLinks={swrLinks.dataLinks} />
      )}
    </Layout>
  );
};

Page.auth = true;

export default Page;
