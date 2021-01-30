import React, { useEffect, useState } from 'react';
import {
    GET_BLOG_TOPICS,
    GET_POST_BY_CATEGORY_ID,
    GET_LIST_BLOGS_BY_AUTHOR,
    GET_BLOG_BY_TAG_NAME,
    GET_ARCHIVE_BLOGS_BY_DATE
} from './Blog.gql'
import { useQuery } from '@apollo/client';
import { useToasts } from '@magento/peregrine';
import Icon from '@landofcoder/yume-ui/src/components/Icon';
import { AlertCircle as AlertCircleIcon } from 'react-feather';
import { usePagination } from '@magento/peregrine';
import { useHistory } from '@magento/venia-drivers';
import LoadingIndicator from '@landofcoder/yume-ui/src/components/LoadingIndicator';

const errorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;

export const useBlogListing = props => {
    const history = useHistory()
    const { filterType, filterValue } = props;
    const [pageSize, setPageSize] = useState(10);
    const [paginationValues, paginationApi] = usePagination();
    const { currentPage, totalPages } = paginationValues;
    const { setCurrentPage, setTotalPages } = paginationApi;

    const pageControl = {
        currentPage,
        setPage: setCurrentPage,
        totalPages
    };
    console.log("Props 2", props)
    const variables = {};
    let queryNode = GET_BLOG_TOPICS;
    switch (filterType) {
        case 'get_post_by_categoryId':
            variables.categoryId = parseInt(filterValue);
            if (parseInt(filterValue) == 0) {
                history.replace('blog.html')
            }
            queryNode = GET_POST_BY_CATEGORY_ID
            break;
        case 'get_post_by_topic':
            variables.topicId = parseInt(filterValue);
            break;
        case 'get_post_by_authorId':
            variables.authorId = parseInt(filterValue);
            queryNode = GET_LIST_BLOGS_BY_AUTHOR
            break;
        case 'get_post_by_tagName':
            variables.alias = filterValue;
            queryNode = GET_BLOG_BY_TAG_NAME
            break;
        case 'get_post_by_date_time':
            variables.like = `%${filterValue}%`;
            queryNode = GET_ARCHIVE_BLOGS_BY_DATE
            break;
        default:
            break;
    }
    const {
        data: blogData,
        loading: blogLoading,
        error: blogError
    } = useQuery(queryNode,{variables})
    // const variables = {
    //     action: filterType ? filterType : 'get_post_list',
    //     currentPage: parseInt(currentPage),
    //     pageSize: parseInt(pageSize)
    // }
    // switch (filterType) {
    //     case 'get_post_by_categoryId':
    //         variables.categoryId = parseInt(filterValue);
    //         break;
    //     case 'get_post_by_topic':
    //         variables.topicId = parseInt(filterValue);
    //         break;
    //     case 'get_post_by_authorName':
    //         variables.authorName = filterValue;
    //         break;
    //     case 'get_post_by_tagName':
    //         variables.tagName = filterValue;
    //         break;
    //     case 'get_post_by_date_time':
    //         variables.filter = {
    //             created_at: {
    //                 like: `%${filterValue}%`
    //             }
    //         };
    //         variables.action = 'get_post_list';
    //         break;
    //     default:
    //         break;
    // }
    // console.log("variables", variables)
    // const {
    //     data: blogData,
    //     loading: blogLoading,
    //     error: blogError
    // } = useQuery(GET_BLOG_TOPICS,{})
    // let {data, error, loading} = null;
    // {data, error, loading} = useQuery(GET_BLOG_TOPICS)

    const [, { addToast }] = useToasts();

    // Set the total number of pages whenever the data changes.
    useEffect(() => {
        const totalPagesFromData = (blogData && blogData.lofBlogList && blogData.lofBlogList.pageInfo)
            ? blogData.mpBlogPosts.pageInfo.endPage
            : null;
        setTotalPages(totalPagesFromData);
        return () => {
            setTotalPages(null);
        };
    }, [blogData, setTotalPages]);

    if (blogError) {
        let derivedErrorMessage;
        const errorTarget = blogError;
        if (errorTarget.graphQLErrors) {
            derivedErrorMessage = errorTarget.graphQLErrors
                .map(({ message }) => message)
                .join(', ');
        } else {
            derivedErrorMessage = errorTarget.message;
        }
        if (derivedErrorMessage) {
            if (currentPage && currentPage > 1) {
                window.location.href = '/blog.html';
            } else {
                addToast({
                    type: 'error',
                    icon: errorIcon,
                    message: derivedErrorMessage,
                    dismissable: true,
                    timeout: 7000
                });
            }
        }
    }
    if (blogLoading) {
        return <LoadingIndicator/>
    }
    if (blogData) {
        console.log("variables", variables)
        console.log("DTA", blogData)
    }

    return {
        blogData,
        blogLoading,
        blogError,
        pageControl,
        pageSize,
        setPageSize
    }
}