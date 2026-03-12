import { gql } from '@apollo/client';

export const GET_CHAPTER_BY_SLUG = gql`
  query GetChapterBySlug($sceneId: String!) {
    chooseYourOwnSquatchCollection(limit: 1, where: { sceneId: $sceneId }) {
      items {
        sys {
          id
        }
        title
        storyText {
            json
        }
        sceneId
        choicesCollection {
          items {
            ... on ChooseYourOwnSquatch {
              title
              sceneId
            }
          }
        }
      }
    }
  }
`;
