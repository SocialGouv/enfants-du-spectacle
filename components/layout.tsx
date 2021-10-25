import { Col, Container, Row } from "@dataesr/react-dsfr";
import type { ReactElement, ReactNode } from "react";
import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.css";

interface Props {
  children: React.ReactNode;
  headerChildren?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children, headerChildren }) => {
  return (
    <div className={styles.container}>
      <Header children={headerChildren} />
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
