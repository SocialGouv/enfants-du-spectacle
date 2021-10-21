import { Col, Container, Row } from "@dataesr/react-dsfr";
import type { ReactElement, ReactNode } from "react";
import React from "react";

import Footer from "./footer";
import Header from "./header";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <>
      <Header />
      <main style={{ minHeight: 600 }}>
        <Container spacing="m-4w">
          <Row>
            <Col>{children}</Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </>
  );
}
