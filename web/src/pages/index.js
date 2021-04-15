import React from "react";
import { graphql } from "gatsby";
// import {
//   mapEdgesToNodes,
//   filterOutDocsWithoutSlugs,
//   filterOutDocsPublishedInTheFuture
// } from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
// import ProjectPreviewGrid from "../components/project-preview-grid";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import logo from '../images/blueGreenWorksComingSoon.svg';
import narrowLogo from '../images/blueGreenWorksComingSoonMobile.svg';
import instagram from '../images/instagram.svg';
import email from '../images/email.svg';
import { cn } from "../lib/helpers";

import * as styles from './index.module.css';

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      subtitle
      description
      keywords
    }
  }
`;

const IndexPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <PortfolioLayout>
        <GraphQLErrorList errors={errors} />
      </PortfolioLayout>
    );
  }

  const site = (data || {}).site;
  // const projectNodes = (data || {}).projects
  //   ? mapEdgesToNodes(data.projects)
  //       .filter(filterOutDocsWithoutSlugs)
  //       .filter(filterOutDocsPublishedInTheFuture)
  //   : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout fullPage>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      {/* <Container> */}
      <div></div>
      <div>
        <img src={narrowLogo} alt="Logo" className={styles.narrowLogo} />
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.linkContainer}>
        <a href="http://instagram.com/bluegreenworks" target="_blank" rel="noopener noreferrer" className={styles.link}>
          <img src={instagram} alt="Instagram Link" className={styles.linkImage} />
        </a>
        <a href="mailto:info@bluegreenworks.com" target="_blank" rel="noopener noreferrer" className={cn(styles.link, styles.emailLink)}>
          <img src={email} alt="Email Link" className={styles.linkImage} />
        </a>
      </div>
        {/* {projectNodes && ( */}
        {/*   <ProjectPreviewGrid */}
        {/*     title="Latest projects" */}
        {/*     nodes={projectNodes} */}
        {/*     browseMoreHref="/archive/" */}
        {/*   /> */}
        {/* )} */}
      {/* </Container> */}
    </Layout>
  );
};

export default IndexPage;
