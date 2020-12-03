import { useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_PRODUCT_CATEGORIES = gql`
  query getProductCategories($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
      items {
        categories {
          name
          url_path
        }
      }
    }
  }
`;
const useProductCategoriesList = (props) => {
  const { urlKey } = props;

  const { error, loading, data } = useQuery(GET_PRODUCT_CATEGORIES, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    variables: {
      urlKey: urlKey
    }
  });

  const categories = useMemo(() => {
    if (data && data.products.items[0]) {
      return data.products.items[0].categories;
    }
    return null;
  }, [data]);

  return {
    error,
    isLoading: loading,
    categories
  };
};

export default useProductCategoriesList;