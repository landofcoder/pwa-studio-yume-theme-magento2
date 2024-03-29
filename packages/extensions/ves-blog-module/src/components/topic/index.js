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
import { GET_TOPIC_BY_URL_KEY } from '../../talons/Blog.gql';
import { Title, Meta } from '@landofcoder/yume-ui/src/components/Head';
import RecentComments from '../recentComments';

const Topic = props => {
    const { topicUrl = "" } = useParams();

    const {
        data: resultData,
        loading: resultLoading
    } = useQuery(GET_TOPIC_BY_URL_KEY,
        {
            variables: {
                url_key: topicUrl.replace('.html', '')
            },
            skip: !topicUrl
        }
    )
    if (resultLoading)
        return <LoadingIndicator />
    if (!resultData || !resultData.mpBlogTopics || !resultData.mpBlogTopics.items || !resultData.mpBlogTopics.items[0])
        return 'Cannot find item';

    const topicData = resultData.mpBlogTopics.items[0];

    return (
        <div className={classes.mainCtn}>
            <Title>{topicData.meta_title ? topicData.meta_title : topicData.name}</Title>
            <Meta name="description" content={topicData.meta_description} />
            <Meta name="keywords" content={topicData.meta_keywords} />
            <Meta name="robots" content={topicData.meta_robots} />
            <BreadCrumb items={
                [
                    {
                        label: 'Blog',
                        path: '/blog.html'
                    },
                    {
                        label: topicData.name,
                    }
                ]
            }
            />
            <h1>{topicData.name}</h1>
            <div className={classes.blogRoot}>
                <div className={classes.blogListing}>
                    <BlogListing classes={classes} filterType="get_post_by_topic" filterValue={topicData.topic_id} />
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

export default Topic