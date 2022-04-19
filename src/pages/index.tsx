import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import About from "src/components/home/About";
import Calendar from "src/components/home/Calendar";
import Intro from "src/components/home/Intro";
import Questions from "src/components/home/Questions";
import Steps from "src/components/home/Steps";
import LayoutHome from "src/components/LayoutHome";

const Home: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (!loading && session)
      router.push("/dossiers").catch((e) => {
        throw e;
      });
  }, [session, loading]);

  return (
    <LayoutHome windowTitle="">
      <Intro />
      <About />
      <Calendar />
      <Steps />
      <Questions />
    </LayoutHome>
  );
};

export default Home;
