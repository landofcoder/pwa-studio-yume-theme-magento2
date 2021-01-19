import React from 'react'
import BreadCrumb from '../breadcrumb/index';
import classes from '../home/home.css';
import BlogListing from '../blogListing/index';
import SearchBlog from '../searchBlog';
import CateTree from '../cateTree';
import TagList from '../tagList';
import TopicList from '../topicList';
import SidebarPosts from '../sidebarPosts';
import SimibarMonthlyListing from '../simibarMonthlyListing';
import { useParams } from "react-router-dom";
import LoadingIndicator from '@landofcoder/yume-ui/src/components/LoadingIndicator';
import { useQuery } from '@apollo/client';
import { GET_CATE_BY_URL_KEY, GET_CATEGORY_META_DATA } from '../../talons/Blog.gql';
import { Title, Meta } from '@landofcoder/yume-ui/src/components/Head';
// import { useQuery } from '@apollo/client';

const Category = props => {
    const { categoryId = "" } = useParams();
    // console.log("CATE-props", categoryId)
    const {
        data: cateData,
        loading: cateLoading,
        error: cateError
    } = useQuery(GET_CATEGORY_META_DATA, {
        variables: {
            categoryId: parseInt(categoryId)
        }
    })
    if (cateLoading) {
        return <LoadingIndicator/>
    }
    if (cateError) {
        return null;
    }
    if (cateData) {
        console.log("CATE DATA", cateData)
    }
    // const {
    //     data: resultData,
    //     loading: resultLoading
    // } = useQuery(GET_CATE_BY_URL_KEY,
    //     {
    //         variables: {
    //             url_key: categoryUrl.replace('.html', '')
    //         },
    //         skip: !categoryUrl
    //     }
    // )
    // if (resultLoading)
    //     return <LoadingIndicator />
    // if (!resultData || !resultData.mpBlogCategories || !resultData.mpBlogCategories.items || !resultData.mpBlogCategories.items[0])
    //     return 'Cannot find item';

    // const cateData = resultData.mpBlogCategories.items[0];

    return (
        <div className={classes.mainCtn}>
            {/* <Title>{cateData.lofBlogCategoryById.page_title ? cateData.lofBlogCategoryById.page_title : cateData.lofBlogCategoryById.name}</Title>
            <Meta name="description" content={cateData.lofBlogCategoryById?.meta_description} />
            <Meta name="keywords" content={cateData.lofBlogCategoryById?.meta_keywords} />
            <Meta name="robots" content={cateData.lofBlogCategoryById?.meta_description} /> */}
            {/* <Meta content={`${cateData?.lofBlogCategoryById?.page_title}`}/> */}
            <BreadCrumb items={
                [
                    {
                        label: 'Blog',
                        path: '/blog.html'
                    },
                    {
                        label: cateData.lofBlogCategoryById.name,
                    }
                ]
            }
            />
            <h1>{cateData.lofBlogCategoryById.name}</h1>
            <div className={classes.blogRoot}>
                <div className={classes.blogSidebar}>
                    <SearchBlog />
                    <SidebarPosts />
                    <CateTree />
                    <SimibarMonthlyListing />
                    <TopicList />
                    <TagList />
                </div>
                <div className={classes.blogListing}>
                    <BlogListing classes={classes} filterType="get_post_by_categoryId" filterValue={categoryId} />
                </div>
            </div>
        </div>
    )
}

export default Category