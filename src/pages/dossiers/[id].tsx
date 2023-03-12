import { Icon, Title } from "@dataesr/react-dsfr";
import { Source } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import { FaHome } from "react-icons/fa";
import Dossier from "src/components/Dossier";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import { RefreshLinks, useDossier } from "src/lib/api";
import { updateDossier } from "src/lib/queries";
import { useSWRConfig } from "swr";

const Page: React.FC = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const dossierId =
    typeof router.query.id == "string" ? Number(router.query.id) : null;
  const { dossier, ...swrDossier } = useDossier(dossierId);
  const { ...swrLinks } = RefreshLinks(
    dossier?.number?.toString() ?? dossier?.externalId!,
    dossier?.source!
  );

  const isLoading = swrDossier.isLoading || swrLinks.isLoading;
  const isError =
    !isLoading &&
    (swrDossier.isError || !dossierId || !dossier || swrLinks.isError);

  if (dossier && dossier.statusNotification !== null) {
    const statusNotification = null;
    mutate(
      `/api/dossiers/${dossier.id}`,
      { ...dossier, statusNotification },
      false
    ).catch((e) => {
      throw e;
    });
    if (dossier.commentNotification.length === 0) {
      updateDossier(dossier, { statusNotification }, () => {
        mutate(`/api/dossiers/${dossier.id}`).catch((e) => {
          throw e;
        });
      });
    }
  }

  // if (dossier && dossier.commentNotification.length > 0) {
  //   console.log("dossier COMMENT NOTIF");
  //   const commentNotification: never[] = [];
  //   mutate(
  //     `/api/dossiers/${dossier.id}`,
  //     { ...dossier, commentNotification },
  //     false
  //   ).catch((e) => {
  //     throw e;
  //   });
  //   updateDossier(dossier, { commentNotification: commentNotification }, () => {
  //     mutate(`/api/dossiers/${dossier.id}`).catch((e) => {
  //       throw e;
  //     });
  //   });
  // }

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
