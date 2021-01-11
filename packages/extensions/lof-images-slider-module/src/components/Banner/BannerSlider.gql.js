import { gql } from '@apollo/client';

export const GET_BANNERS_SLIDER = gql`
    query getBannerSlider($sliderId: Int!) {
        lofBannerSlider(sliderId: $sliderId) {
            banners {
                resource_path
                resource_type
                title
            }
        }
    }
`