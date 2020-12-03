import useProductCategoriesList from '../hooks/useProductCategoriesList';

const wrapUseImageSlider = original => {
    return function useImageSlider(props, ...resArgs) {
        console.log('wrapper');
        return {
            ...props,
            ...resArgs
        };
    };
    //   return function useProductFullDetails(props, ...restArgs) {
    //     console.log("Calling new useProductFullDetails() function!")

    //     const { product } = props;

    //     const categoriesListData = useProductCategoriesList({
    //       urlKey: product.url_key
    //     });

    //     const { productDetails, ...defaultReturnData } = original(
    //       props,
    //       ...restArgs
    //     );

    //     return {
    //       ...defaultReturnData,
    //       productDetails: {
    //         ...productDetails,
    //         categoriesList: categoriesListData
    //       }
    //     };
    //   };
};

export default wrapUseImageSlider;
