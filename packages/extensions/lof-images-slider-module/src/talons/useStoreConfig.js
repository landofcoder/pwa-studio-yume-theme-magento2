import React from 'react';
import { GET_BANNERS_SLIDER_CONFIG } from './BannerSlider.gql';
import { useQuery } from '@apollo/client';
import LoadingIndicator from '@landofcoder/yume-ui/src/components/LoadingIndicator';

export const useStoreConfig = props => {
    const {
        data: configData,
        error: configError,
        loading: configLoading
    } = useQuery(GET_BANNERS_SLIDER_CONFIG, {})

    if (configLoading) {
        return <LoadingIndicator></LoadingIndicator>
    }
    else if (configError) {
        return 'An error occurred while processing request';
    }
    else if (configData) {
        console.log("Store config", configData)
    }
    return {
        configData,
        configError,
        configLoading
    }
}