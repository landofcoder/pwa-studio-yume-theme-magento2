import { gql } from '@apollo/client';

export const GET_PRODUCT_THUMBNAILS_BY_SKU = gql`
    query GetProductThumbnailsBySku($skus: [String!]!) {
        products(filter: { sku: { in: $skus } }) {
            items {
                id
                sku
                thumbnail {
                    label
                    url
                }
                url_key
                url_suffix
            }
        }
    }
`;

export default {
    queries: {
        getProductThumbnailsQuery: GET_PRODUCT_THUMBNAILS_BY_SKU
    }
};
