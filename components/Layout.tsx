import { Col, Container, Row } from "@dataesr/react-dsfr";
import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.css";

interface Props {
  children: React.ReactNode;
  headerMiddle?: React.ReactNode;
  headerBottom?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children, headerMiddle, headerBottom }) => {
  return (
    <div className={styles.container}>
      <Header childrenMiddle={headerMiddle} childrenBottom={headerBottom} />
      <main style={{ minHeight: 600 }}>
        <Container spacing="m-4w">
          <Row>
            <Col>{children}</Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
