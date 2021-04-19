import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from 'gatsby-plugin-image';

import GraphQLErrorList from "../components/graphql-error-list";
import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import Dropdown from '../components/dropdown';
import logo from '../images/blueGreenWorksComingSoon.svg';
import narrowLogo from '../images/blueGreenWorksComingSoonMobile.svg';
import instagram from '../images/instagram.svg';
import email from '../images/email.svg';
import { cn } from "../lib/helpers";

import * as styles from './previewHomepage.module.scss';

export const query = graphql`
  query PreviewHomepagePageQuery {
    site: sanitySiteSettings(_id: { regex: "/siteSettings/" }) {
      title
      description
      keywords
    }
    previewHomepage: sanityPreviewHomepage(_id: { regex: "/(drafts.|)previewHomepage/" }) {
      title,
      headerImage {
        image {
          asset {
            _id
            gatsbyImageData(fit: FILLMAX)
          }
        }
        alt
      }
      series {
        _key
        title
        description
        images {
          _key
          image {
            asset {
              _id
              gatsbyImageData(fit: FILLMAX)
              metadata {
                dimensions {
                  aspectRatio
                }
              }
            }
          }
          caption
          alt
        }
        tearSheets {
          _key
          title
          PDF {
            asset {
              url
            }
          }
        }
      }
    }
  }
`;

const PreviewHomepagePage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <PortfolioLayout>
        <GraphQLErrorList errors={errors} />
      </PortfolioLayout>
    );
  }

  const site = (data || {}).site;
  const previewHomepage = (data || {}).previewHomepage;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  const isEven = (i) => {
    return (i % 2) !== 0;
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <div className={styles.headerLink}>
          <img src={narrowLogo} alt="Logo" className={styles.narrowLogo} />
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <div className="mt-1 mb-2">
          <GatsbyImage
            image={previewHomepage.headerImage.image.asset.gatsbyImageData}
            alt={previewHomepage.headerImage.alt}
            className={styles.headerImageContainer}
          />
        </div>

        <hr />

        {previewHomepage.series.map((series, i) =>
          <div key={series._key} className={cn(styles.series, 'my-2')}>
            <div className={styles.seriesImages}>
              {series.images.map((figure, i) =>
                <div key={figure._key} className={styles.seriesImageContainer}>
                  { figure.image &&
                    <GatsbyImage
                      image={figure.image.asset.gatsbyImageData}
                      alt={figure.alt}
                      className={styles.seriesImage}
                      style={{display: 'block'}}
                    />
                  }
                  <div className={cn(styles.seriesImageCaptionSpacer, 'smallLabel')}>
                    {figure.caption}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.seriesInfo}>
              <div className={styles.seriesText}>
                <h2>{series.title}</h2>
                <p>{series.description}</p>
              </div>
              { series.tearSheets.length !== 0 &&
                <Dropdown tearSheets={series.tearSheets} reversed={isEven(i)} />
              }
              <div className={styles.seriesImageCaptionSpacer}></div>
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default PreviewHomepagePage;
