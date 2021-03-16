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
        products {
            product {
                description {
                    html
                }
                id
                media_gallery_entries {
                    id
                    label
                    position
                    disabled
                    file
                }
                meta_description
                name
                price {
                    regularPrice {
                        amount {
                            currency
                            value
                        }
                    }
                }
                sku
                small_image {
                    url
                }
                url_key
                url_suffix
                ... on ConfigurableProduct {
                    configurable_options {
                        attribute_code
                        attribute_id
                        id
                        label
                        values {
                            default_label
                            label
                            store_label
                            use_default_value
                            value_index
                            swatch_data {
                                ... on ImageSwatchData {
                                    thumbnail
                                }
                                value
                            }
                        }
                    }
                    variants {
                        attributes {
                            code
                            value_index
                        }
                        product {
                            id
                            media_gallery_entries {
                                id
                                disabled
                                file
                                label
                                position
                            }
                            sku
                            stock_status
                            price {
                                regularPrice {
                                    amount {
                                        currency
                                        value
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
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

export const LIST_BRANDS_BY_PRODUCT_ID = gql`
    query lofBrandByProduct($product_id: Int) {
        lofBrandByProduct(product_id: $product_id) {
            items {
                ...BrandFragment
            }
            total_count
        }
    }
    ${BRAND_FRAGMENT}
`;

export const GET_SEARCH_BRAND = gql`
    query lofBrandList($brandName: String) {
        lofBrandList(search: $brandName) {
            items {
                ...BrandFragment
            }
            total_count
        }
    }
    ${BRAND_FRAGMENT}
`;
