import gql from 'graphql-tag';

export const BRAND_FRAGMENT = gql`
    fragment BrandFragment on Brand {
        brand_id
        creation_time
        description
        image
        meta_description
        meta_keywords
        name
        thumbnail
        url_key
    }
`;

export const LIST_BRANDS = gql`
    query lofBrandList {
        lofBrandList {
            items {
                ...BrandFragment
            }
            total_count
        }
    }
    ${BRAND_FRAGMENT}
`;

export const GET_SEARCH_BRAND = gql`
    query lofBrandList($name: String!) {
        lofBrandList(filter: { name: { like: $name } }) {
            items {
                ...BrandFragment
            }
            total_count
        }
    }
    ${BRAND_FRAGMENT}
`;
