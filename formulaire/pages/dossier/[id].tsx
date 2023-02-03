import { Container, Link } from '@dataesr/react-dsfr';
import { Dossier } from '@prisma/client';
import { useRouter } from 'next/router';
import React from "react";
import { StateProvider } from 'src/context/StateContext';
import DossierForm from '../../src/components/Dossier/DossierForm';
import HeadingDossier from '../../src/components/Dossier/HeadingDossier';
import Layout from '../../src/components/Layout'
import { DossierData, getDossier, ResDossier } from '../../src/fetching/dossiers';

const DossierPage: React.FC = () => {
  const router = useRouter();
  const [dossier, setDossier] = React.useState<ResDossier>()

  const fetchDossier = async () => {
    if (router.query.id) {
      const res = await getDossier(router.query.id as string)
      setDossier(res)
    }
  }
  
  React.useEffect(() => {
    fetchDossier()
  }, [router])

  return (
    <Layout windowTitle='Mes dossiers'>

      {dossier && 
        <>
          <HeadingDossier dossier={dossier.dossier}></HeadingDossier>
        </>
      }
      <Container>
        <Link href='/'>Retour aux dossiers</Link>
        {dossier && 
          <>
            <StateProvider>
              <DossierForm dossier={dossier.dossier} docs={dossier.docs}></DossierForm>
            </StateProvider>
          </>
        }
      </Container>
    </Layout>
  );
};

DossierPage.auth = true

export default DossierPage;
