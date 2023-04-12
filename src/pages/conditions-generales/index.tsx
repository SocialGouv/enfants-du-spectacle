import React from "react";
import Cgu from "src/components/Cgu";
import LayoutHome from "src/components/LayoutHome";

const Conditions: React.FC = () => {
  return (
    <LayoutHome windowTitle="Conditions générales d’Utilisation">
      <Cgu isModal={false} />
    </LayoutHome>
  );
};

export default Conditions;
