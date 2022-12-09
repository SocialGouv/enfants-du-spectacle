import { Container } from '@dataesr/react-dsfr';
import ActionBar from '../src/components/home/ActionBar';
import TableDossiers from '../src/components/home/TableDossiers';
import Layout from '../src/components/Layout'

const Home: React.FC = () => {

  return (
    <Layout windowTitle='Mes dossiers'>
      <Container>
        <ActionBar></ActionBar>
        <TableDossiers></TableDossiers>
      </Container>
    </Layout>
  );
};

Home.auth = true

export default Home;
