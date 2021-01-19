import gql from 'graphql-tag';

const PageInfoFragment = gql`
    fragment PageInfoFragment on PageInfo {
        pageSize
        currentPage
        hasNextPage
        hasPreviousPage
        startPage
        endPage
    }
`

const CategoryFragment = gql`
    fragment CategoryFragment on Category {
        category_id
        name
        url_key
        description
        store_ids
        enabled
        meta_title
        meta_keywords
        meta_description
        meta_robots
        parent_id
        path
        position
        level
        children_count
        created_at
        updated_at
        import_source
    }
`

const TagFragment = gql`
    fragment TagFragment on Tag {
        tag_id
        name
        description
        store_ids
        enabled
        url_key
        meta_title
        meta_keywords
        meta_description
        meta_robots
        created_at
        updated_at
        import_source
    }
`

const TopicFragment = gql`
    fragment TopicFragment on Topic {
        topic_id
        name
        description
        store_ids
        enabled
        url_key
        meta_title
        meta_keywords
        meta_description
        meta_robots
        created_at
        updated_at
        import_source
    }
`
const ProductFragment = gql`
    fragment ProductFragment on Product {
        entity_id
        attribute_set_id
        type_id
        sku
        has_options
        required_options
        created_at
        updated_at
    }
`

const PostFragment = gql`
    fragment PostFragment on Post {
        post_id
        name
        short_description
        image
        enabled
        url_key
        in_rss
        allow_comment
        meta_title
        meta_keywords
        meta_description
        meta_robots
        created_at
        updated_at
        author_id
        author_url
        author_url_key
        author_name
        publish_date
        import_source
        layout
        view_traffic
    }
`
const BlogFragment = gql`
    fragment BlogFragment on Blog {
        title
      identifier
      short_content
      image
      page_title
      creation_time
      author {
        author_id
        page_title
        nick_name
        meta_keywords
        meta_description
        user_id
        email
        is_view
        social_networks
        user_name
      }
    }
`
export const GET_BLOG_POSTS = gql`
    query mpBlogPosts (
        $action : String!,
        $filter : PostsFilterInput,
        $authorName : String,
        $tagName : String,
        $topicId : Int,
        $categoryId : Int,
        $categoryKey : String,
        $postId : Int,
        $pageSize : Int,
        $currentPage : Int
    ) {
        mpBlogPosts (
            action : $action
            filter: $filter
            authorName : $authorName
            tagName : $tagName
            topicId : $topicId
            categoryId : $categoryId
            categoryKey : $categoryKey
            postId : $postId
            pageSize : $pageSize
            currentPage : $currentPage
        ) {
            items {
                ...PostFragment
                categories {
                    total_count
                    items {
                        ...CategoryFragment
                    }
                }
            }
            total_count
            pageInfo {
                ...PageInfoFragment
            }
        }
    }
    ${PostFragment}
    ${PageInfoFragment}
    ${CategoryFragment}
`;

export const GET_SEARCH_BLOG_POST = gql`
    query mpBlogPosts (
        $query : String!
    ) {
        mpBlogPosts (
            action : "get_post_list",
            filter : {
                name : {
                    like: $query
                }
            }
        ) {
            items {
                post_id
                name
                short_description
                image
                enabled
                url_key
                publish_date
            }
        }
    }
`

export const GET_BLOG_CATEGORIES = gql`
    query mpBlogCategories{
        mpBlogCategories (
            action : "get_category_list"
            pageSize: 999
        ) {
            items {
                ...CategoryFragment
            }
        }
    }
    ${CategoryFragment}
`

export const GET_BLOG_TAGS = gql`
    query mpBlogTags{
        mpBlogTags {
            items {
                ...TagFragment
                posts {
                    items {
                        post_id
                    }
                }
            }
        }
    }
    ${TagFragment}
`

export const GET_BLOG_TOPICS = gql`
    query lofBlogList{
        lofBlogList {
            items {
                ...BlogFragment
            }
            total_count
        }
    }
    ${BlogFragment}
`

export const GET_SIDEBAR_BLOG_POSTS = gql`
    query mpBlogPosts (
        $sortBy : String,
        $pageSize : Int,
    ) {
        mpBlogPosts (
            action : "get_post_list"
            sortBy: $sortBy
            pageSize: $pageSize
        ) {
            items {
                post_id
                name
                short_description
                image
                enabled
                url_key
                publish_date
            }
        }
    }
`

export const GET_CATE_BY_URL_KEY = gql`
    query mpBlogCategories(
        $url_key : String!
    ){
        mpBlogCategories (
            action : "get_category_list"
            filter: {
                url_key : {
                    eq : $url_key
                }
            }
        ) {
            items {
                ...CategoryFragment
            }
        }
    }
    ${CategoryFragment}
`

export const GET_TOPIC_BY_URL_KEY = gql`
    query mpBlogTopics(
        $url_key : String!
    ){
        mpBlogTopics (
            filter: {
                url_key : {
                    eq : $url_key
                }
            }
        ) {
            items {
                ...TopicFragment
            }
        }
    }
    ${TopicFragment}
`

export const GET_TAG_BY_URL_KEY = gql`
    query mpBlogTags(
        $url_key : String!
    ){
        mpBlogTags (
            filter: {
                url_key : {
                    eq : $url_key
                }
            }
        ) {
            items {
                ...TagFragment
            }
        }
    }
    ${TagFragment}
`

export const GET_BLOG_POST_BY_URL_KEY = gql`
    query mpBlogPosts (
        $url_key : String!,
    ) {
        mpBlogPosts (
            action : "get_post_list"
            filter: {
                url_key : {
                    eq : $url_key
                }
            }
        ) {
            items {
                ...PostFragment
                post_content
                categories {
                    total_count
                    items {
                        ...CategoryFragment
                    }
                }
                tags {
                    total_count
                    items {
                        ...TagFragment
                    }
                }
                topics {
                    total_count
                    items {
                        ...TopicFragment
                    }
                }
                products {
                    total_count
                    items {
                        ...ProductFragment
                    }
                }
                posts {
                    total_count
                    items {
                        ...PostFragment
                        categories {
                            total_count
                            items {
                                ...CategoryFragment
                            }
                        }
                    }
                }
            }
        }
    }
    ${PostFragment}
    ${CategoryFragment}
    ${TagFragment}
    ${TopicFragment}
    ${ProductFragment}
`;

export const GET_BLOG_ARCHIVE = gql`
    query mpBlogMonthlyArchive{
        mpBlogMonthlyArchive {
            items {
                label
                quantity
            }
            total_count
        }
    }
`

export const GET_BLOG_ARCHIVE_DETAILS = gql`
    query mpBlogMonthlyArchive(
        $monthly: Int!,
        $year: Int!
    ) {
        mpBlogMonthlyArchive(
            monthly: $monthly,
            year: $year
        ) {
            items {
                label
                quantity
                items {
                    ...PostFragment
                }
            }
            total_count
        }
    }
    ${PostFragment}
`

export const GET_PRODUCTS_BY_SKUS = gql`
    query getProductsBySku($skus: [String], $pageSize: Int!) {
        products(filter: { sku: { in: $skus } }, pageSize: $pageSize) {
            items {
                id
                name
                sku
                small_image {
                    url
                }
                url_key
                url_suffix
                price {
                    regularPrice {
                        amount {
                            value
                            currency
                        }
                    }
                }
            }
            total_count
        }
    }
`

export const GET_SEARCH_BLOGS = gql`
    query lofBlogList(
        $search: String, $filter: BlogFilterInput,
        $pageSize: Int, $currentPage: Int
        ) {
            lofBlogList(
                search: $search, filter: $filter,
                pageSize: $pageSize, currentPage: $currentPage
            ) {
                items {
                    title,
                    identifier,
                    short_content,
                    creation_time,
                    image
                }
                total_count
            }
        }
`;
export const GET_SIDEBAR_BLOGS = gql`
    query getSidebarBlogs (
        $search: String,
        $filter: BlogFilterInput,
        $pageSize: Int,
        $currentPage: Int
    ) {
        lofBlogList(
            search: $search,
            filter: $filter,
            pageSize: $pageSize,
            currentPage: $currentPage
        ) {
            items {
                post_id,
                title,
                identifier,
                short_content,
                image,
                creation_time
            }
            total_count
        }
    }
`;
export const BLOG_CATEGORY_FRAGMENT = gql`
    fragment BlogCategoryFragment on Category {
        category_id
        name
        identifier
        description
        stores
        is_active
        meta_keywords
        meta_description
        parent_id
        creation_time
        update_time
        image
    }
`;
export const GET_BLOG_CATEGORIES_LIST = gql`
    query lofBlogCategoryList($search: String, $pageSize: Int, $currentPage: Int) {
        lofBlogCategoryList(search: $search, pageSize: $pageSize, currentPage: $currentPage) {
            items {
                ...BlogCategoryFragment
            }
        }
    }
    ${BLOG_CATEGORY_FRAGMENT}
`;
export const GET_POST_BY_CATEGORY_ID = gql`
    query lofBlogCategoryById($categoryId: Int!) {
        lofBlogCategoryById(category_id: $categoryId) {
            ...BlogCategoryFragment
            posts {
                ...BlogFragment
            }
        }
    }
    ${BLOG_CATEGORY_FRAGMENT}
    ${BlogFragment}
`;
export const GET_CATEGORY_META_DATA = gql`
    query lofBlogCategoryById($categoryId: Int!) {
        lofBlogCategoryById(category_id: $categoryId) {
            name
            identifier
            page_title
            meta_keywords
            meta_description
        }
    }
`;
export const GET_POPULAR_BLOGS = gql`
    query lofBlogList($pageSize: Int) {
        lofBlogList(pageSize: $pageSize) {
            items {
                ...BlogFragment
            }
            total_count
        }
    }
    ${BlogFragment}
`;
export const GET_LATEST_BLOGS = gql`
    query lofBlogList($pageSize: Int, $currentPage: Int) {
        lofBlogList(pageSize: $pageSize, currentPage: $currentPage) {
            items {
                ...BlogFragment
            }
            total_count
        }
    }
    ${BlogFragment}
`;