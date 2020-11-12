import useProductCategoriesList from "../hooks/useProductCategoriesList";

const wrapUseProductFullDetails = (original) => {
  return function useProductFullDetails(props, ...restArgs) {
    console.log("Calling new useProductFullDetails() function!")
    console.log(original.toString());
    const { product } = props;

    const categoriesListData = useProductCategoriesList({
      urlKey: product.url_key
    });

    const { productDetails, ...defaultReturnData } = original(
      props,
      ...restArgs
    );

    return {
      ...defaultReturnData,
      productDetails: {
        ...productDetails,
        categoriesList: categoriesListData
      }
    };
  };
};

export default wrapUseProductFullDetails;