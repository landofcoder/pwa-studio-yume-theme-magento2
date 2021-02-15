import { LIST_BRANDS } from './brand.gql';
import { useQuery } from '@apollo/client';

export const useListBrand = props => {

    const {
        data: listBrandData,
        error: listBrandError,
        loading: listBrandLoading,
    } = useQuery(LIST_BRANDS, {fetchPolicy: "cache-first"})


    return {
        listBrandData,
        listBrandError,
        listBrandLoading
    }

}