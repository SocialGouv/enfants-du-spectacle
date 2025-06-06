import { Container, Link } from "@dataesr/react-dsfr";
import { Comments, User } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import ShareDossierModal from "src/components/Dossier/ShareDossierModal";
import { StateProvider } from "src/context/StateContext";
import { getComments } from "src/fetching/commentaires";
import DossierForm from "../../src/components/Dossier/DossierForm";
import HeadingDossier from "../../src/components/Dossier/HeadingDossier";
import Layout from "../../src/components/Layout";
import {
  DossierData,
  getDossier,
  ResDossier,
} from "../../src/fetching/dossiers";
import { getAgentByDossierId } from "src/fetching/instructeur";
import IconLoader from "src/components/IconLoader";

const DossierPage: React.FC = () => {
  const router = useRouter();
  const [dossier, setDossier] = React.useState<ResDossier>();
  const [comments, setComments] = React.useState<Comments[]>([]);
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [showDialogue, setShowDialogue] = React.useState<Boolean>(false);
  const [agent, setAgent] = React.useState<User>();
  const [commissionDate, setCommissionDate] = React.useState<Date>();

  const fetchDossier = async () => {
    if (router.query.id) {
      setLoading(true);
      const res = await getDossier(router.query.id as string);
      setDossier(res);
      const resComments = await getComments(
        parseInt(router.query.id as string)
      );
      setComments(resComments);
      const resAgentCommission = await getAgentByDossierId(
        res.dossier.id.toString()
      );
      if (resAgentCommission.instructeur)
        setAgent(resAgentCommission.instructeur);
      if (resAgentCommission.commissionDate)
        setCommissionDate(resAgentCommission.commissionDate);

      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDossier();
  }, [router]);

  function handleCollaboratorIdsChange(newCollaboratorId: number) {
    const d = dossier?.dossier;
    if (d) {
      const dossierUpdated: ResDossier = {
        dossier: {
          ...d,
          collaboratorIds: [...d.collaboratorIds, newCollaboratorId],
        } as DossierData,
        docs: dossier?.docs,
      };
      setDossier(dossierUpdated);
    }
  }

  return (
    <>
      {dossier ? 
        <Layout windowTitle="Mes dossiers">
          {dossier && (
            <>
              <HeadingDossier
                dossier={dossier.dossier}
                setShowDialogue={setShowDialogue}
              ></HeadingDossier>
              <ShareDossierModal
                dossier={dossier.dossier}
                showDialogue={showDialogue}
                setShowDialogue={setShowDialogue}
                setCollaboratorId={handleCollaboratorIdsChange}
              />
            </>
          )}
          <Container>
            <Link href="/">Retour aux dossiers</Link>
            {dossier && (
              <>
                <StateProvider>
                  {!loading && (
                    <DossierForm
                      dossier={dossier.dossier}
                      docs={dossier.docs}
                      comments={comments}
                    ></DossierForm>
                  )}
                </StateProvider>
              </>
            )}
          </Container>
        </Layout>
        : 
        <div style={{textAlign: 'center', margin: '2rem'}}><IconLoader></IconLoader></div>
      }
    </>
  );
};

DossierPage.auth = true;

export default DossierPage;
