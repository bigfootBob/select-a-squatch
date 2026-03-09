import { gql } from '@apollo/client';

export const GET_CHAPTER_BY_SLUG = gql`
  query GetChapterBySlug($slug: String!) {
    chapterCollection(limit: 1, where: { slug: $slug }) {
      items {
        sys {
          id
        }
        title
        content
        slug
        allowCustomInput
        choicesCollection {
          items {
            ... on Choice {
              text
              nextChapter {
                slug
              }
            }
          }
        }
      }
    }
  }
`;
