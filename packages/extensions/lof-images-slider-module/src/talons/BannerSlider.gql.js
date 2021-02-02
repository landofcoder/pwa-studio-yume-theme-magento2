import { gql } from '@apollo/client';

export const GET_BANNERS_SLIDER = gql`
    query getBannerSlider($sliderId: Int!, $storeId: Int) {
        lofBannerSlider(sliderId: $sliderId, storeId: $storeId) {
            slider_id
            is_featured
            stores
            tags
            customer_groups
            banners {
                title
                sub_title
                show_sub_title
                alt_text
                is_enabled
                is_featured
                sort_order
                link
                resource_path
                resource_type
                resource_map {
                    max_width
                    min_width
                }
            }
        }
    }
`

export const GET_BANNERS_MORE_SLIDERS = gql`
    query getBannerSliders(
        $isFeatured: Int, 
        $tags: String, 
        $title: String
        $page: Int,
        $limit: Int
        ) {
        lofBannerSliders(
            filters: {
                is_featured: {eq: $isFeatured},
                tags: {match: $tags},
                title: {match: $title}
            }
            pageSize: $limit
            currentPage: $page
        ) {
            items{
                slider_id
                is_featured
                stores
                tags
                customer_groups
                banners {
                    title
                    sub_title
                    show_sub_title
                    alt_text
                    is_enabled
                    is_featured
                    sort_order
                    link
                    resource_path
                    resource_type
                    resource_map {
                        max_width
                        min_width
                    }
                }
            }
            total_count
        }
    }
`

export const GET_BANNERS_SLIDER_CONFIG = gql`
    query getBannerSliderConfig {
        storeConfig {
            secure_base_media_url
            base_media_url
            lof_bannerslider{
                enabled
                default_homepage_slider
                items_to_show
                sliding_speed
                autoplay
                autoplay_speed
                animation_style
                show_nav
                show_dots
                full_width
            }
        }
    }
`