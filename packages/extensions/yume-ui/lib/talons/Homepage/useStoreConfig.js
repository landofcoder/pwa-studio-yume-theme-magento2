import React from 'react';
import { gql, useQuery } from '@apollo/client';
import LoadingIndicator from '../../../src/components/LoadingIndicator';
const queryNode = gql`
    query getStoreConfig {
        storeConfig {
            id
            store_name
            code
            lof_bannerslider {
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
`;
const useStoreConfig = props => {
    const {
        loading: storeConfigLoading,
        error: storeConfigError,
        data: storeConfigData
    } = useQuery(queryNode, {});
    if (storeConfigLoading) {
        return <LoadingIndicator />;
    } else if (storeConfigError) {
        return 'Can not get store config';
    } else if (storeConfigData) {
        console.log('store config data', storeConfigData);
    }
    return {
        storeConfigLoading,
        storeConfigError,
        storeConfigData
    };
};
export default useStoreConfig;
