import { Col, Container, Row } from "@dataesr/react-dsfr";
import Head from "next/head";
import React from "react";
import Footer from "src/components/Footer";
import type { BreadcrumbData } from "src/components/Header";
import Header from "src/components/Header";
import styles from "src/components/Layout.module.css";

interface Props {
  children: React.ReactNode;
  windowTitle: string;
  headerMiddle?: React.ReactNode;
  headerBottom?: React.ReactNode;
  breadcrumbs?: BreadcrumbData[];
}

const Layout: React.FC<Props> = ({
  children,
  headerMiddle,
  headerBottom,
  windowTitle,
  breadcrumbs,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          {[windowTitle, "Enfants du Spectacle"].filter((e) => e).join(" - ")}
        </title>
      </Head>
      <Header
        childrenMiddle={headerMiddle}
        childrenBottom={headerBottom}
        breadcrumbs={breadcrumbs}
      />
      <main style={{ minHeight: 600, paddingTop: "1rem" }}>
        <Container>
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
