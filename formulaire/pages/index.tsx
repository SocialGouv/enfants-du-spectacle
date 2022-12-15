import { Container } from '@dataesr/react-dsfr';
import SearchBar from 'src/components/home/SearhBar';
import ActionBar from '../src/components/home/ActionBar';
import TableDossiers from '../src/components/home/TableDossiers';
import Layout from '../src/components/Layout'
import React from "react";
import { statusGroup } from 'src/lib/types';

const Home: React.FC = () => {

  const [search, setSearch] = React.useState<string>('')
  const [counts, setCounts] = React.useState<Record<statusGroup, number>>()
  const [status, setStatus] = React.useState<statusGroup>('enCours')

  const handleSearch = (term: string) => {
    setSearch(term)
  } 

  const handleStatus = (status: statusGroup) => {
    setStatus(status)
  }

  const handleCount = (enCours: number, termines: number) => {
    setCounts({enCours: enCours, termines: termines})
  }

  return (
    <Layout windowTitle='Mes dossiers'>
    <SearchBar action={handleSearch} />
      <Container>
        <ActionBar action={handleStatus} counts={counts}></ActionBar>
        <TableDossiers search={search} action={handleCount} status={status}></TableDossiers>
      </Container>
    </Layout>
  );
};

Home.auth = true

export default Home;
