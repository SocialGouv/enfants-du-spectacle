import { Icon, Title } from "@dataesr/react-dsfr";
import React from "react";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import Utilisateurs from "src/components/Utilisateurs";
import { trpc } from "src/lib/trpc";
import type { NextPage } from "next";

type NextPageWithAuth = NextPage & { auth?: boolean };

const Page: NextPageWithAuth = () => {
  const [page, setPage] = React.useState(1);
  const limit = 10;
  
  const utils = trpc.useContext();
  
  const { data, isLoading, isError, refetch } = trpc.users.getUsers.useQuery(
    {
      page,
      limit,
    },
    {
      // Force refetch quand les paramètres changent
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      staleTime: 0, // Pas de cache
      cacheTime: 0, // Pas de cache du tout
      keepPreviousData: false, // Ne pas garder les données précédentes
    }
  );
  
  const users = data?.users || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 0;
  const hasNext = data?.hasNext || false;
  const hasPrev = data?.hasPrev || false;
  
  const handleUserUpdate = React.useCallback(async () => {
    // Invalider le cache, revenir à la page 1 et refetch
    setPage(1);
    await utils.users.getUsers.invalidate();
    await refetch();
  }, [utils, refetch]);
  
  const handlePageChange = React.useCallback(async (newPage: number) => {
    setPage(newPage);
    // Force invalidation du cache pour la nouvelle page
    await utils.users.getUsers.invalidate({ page: newPage, limit });
  }, [utils, limit]);

  return (
    <Layout
      windowTitle="Utilisateurs"
      headerMiddle={<Title as="h1">Utilisateurs</Title>}
      breadcrumbs={[
        { href: "/dossiers", label: "Accueil" },
        { label: "Liste utilisateurs" },
      ]}
    >
      {isLoading && <IconLoader />}
      {isError && <Icon name="ri-error" />}
      {!isLoading && !isError && users && (
        <>
          <Utilisateurs allUsers={users} onUserUpdate={handleUserUpdate} onPageChange={handlePageChange} page={page} total={total} totalPages={totalPages}/>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "10px", justifyContent: 'center' }}>
              <button 
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
                disabled={page <= 1}
                className="postButton"
              >
                Précédent
              </button>
              <button 
                onClick={() => {
                  if (hasNext) {
                    setPage(page + 1);
                  }
                }}
                disabled={!hasNext}
                className="postButton"
              >
                Suivant
              </button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

Page.auth = true;

export default Page;
