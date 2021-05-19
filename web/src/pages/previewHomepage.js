import React from "react";
import { graphql } from "gatsby";

import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Homepage from '../components/homepage';

export const query = graphql`
  query PreviewHomepagePageQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      title
      email
    }
    homepage: sanityHomepage(_id: { regex: "/(drafts.|)homepage/" }) {
      title
      contactHeader
      _rawDescription
      ...HomepageHeaderImageQuery
      ...HomepageHeaderImageNarrowQuery
      seriesHighlights {
        _key
        series {
          _key
          title
          description
        }
        products {
          _id
          title
          slug {
            current
          }
          ...ProductFirstImageNarrowQuery
          ...ProductImagesQuery
        }
      }
    }
  }
`;

const PreviewHomepagePage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const homepage = (data || {}).homepage;

  // console.log(site);
  // console.log(homepage);

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  if (!homepage) {
    throw new Error(
      'Missing "Homepage". Open the studio at http://localhost:3333 and add some content to "Homepage" and restart the development server.'
    );
  }

  const isEven = (i) => {
    return (i % 2) !== 0;
  }

  return (
    <Layout>
      <SEO title={site.title} />
      <Homepage
        site={site}
        homepage={homepage}
      />

    </Layout>
  );
};

export default PreviewHomepagePage;
