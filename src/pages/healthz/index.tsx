import { Button } from "@dataesr/react-dsfr";
import React from "react";
import Layout from "src/components/Layout";

const Healthz: React.FC = () => {
  return (
    <Layout windowTitle="">
      <Button
        type="button"
        onClick={() => {
          throw new Error("on-purpose error client side");
        }}
      >
        Throw error
      </Button>
    </Layout>
  );
};

export default Healthz;
