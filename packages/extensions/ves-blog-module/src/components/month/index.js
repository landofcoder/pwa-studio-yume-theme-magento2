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
import { GET_BLOG_ARCHIVE_DETAILS } from '../../talons/Blog.gql';
import { Title, Meta } from '@landofcoder/yume-ui/src/components/Head';
import RecentComments from '../recentComments';

const Category = props => {
    const { monthUrl = "" } = useParams();

    const dateData = monthUrl.replace('.html', '').replace(' ', '').split('-');
    const {
        data: resultData,
        loading: resultLoading
    } = useQuery(GET_BLOG_ARCHIVE_DETAILS,
        {
            variables: {
                monthly: parseInt(dateData[1]),
                year: parseInt(dateData[0])
            },
            skip: !monthUrl || !dateData || !dateData[0] || !dateData[1]
        }
    )
    if (resultLoading)
        return <LoadingIndicator />
    if (!resultData || !resultData.mpBlogMonthlyArchive || !resultData.mpBlogMonthlyArchive.items || !resultData.mpBlogMonthlyArchive.items[0])
        return 'Cannot find item';

    const archiveData = resultData.mpBlogMonthlyArchive.items[0];

    return (
        <div className={classes.mainCtn}>
            <Title>{archiveData.label}</Title>
            <BreadCrumb items={
                [
                    {
                        label: 'Blog',
                        path: '/blog.html'
                    },
                    {
                        label: archiveData.label,
                    }
                ]
            }
            />
            <h1>{archiveData.label}</h1>
            <div className={classes.blogRoot}>
                <div className={classes.blogListing}>
                    <BlogListing classes={classes} filterType="get_post_by_date_time" filterValue={`${dateData[0]}-${dateData[1]}`} />
                </div>
                <div className={classes.blogSidebar}>
                    <SearchBlog />
                    <SidebarPosts />
                    <CateTree />
                    <SimibarMonthlyListing />
                    {/* <TopicList /> */}
                    <RecentComments />
                    <TagList />
                </div>
            </div>
        </div>
    )
}

export default Category