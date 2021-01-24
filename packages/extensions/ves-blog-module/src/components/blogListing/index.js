import React, { useEffect } from 'react'
import { mergeClasses } from '@landofcoder/yume-ui/src/classify';
import defaultClasses from './blogListing.css'
import { useBlogListing } from '../../talons/useBlogListing'
import LoadingIndicator from '@landofcoder/yume-ui/src/components/LoadingIndicator';
import BlogListingItem from '../blogListingItem'
import Pagination from '@landofcoder/yume-ui/src/components/Pagination';
import { Util } from '@magento/peregrine';
import { listBlogs } from '../../data/blogs';
const data = listBlogs();
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const BlogListing = props => {
    const { filterType, filterValue } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    console.log("Props 1", props)
    const talonProps = useBlogListing({ filterType, filterValue })
    let {
        blogData,
        blogLoading,
        blogError,
        pageControl,
        pageSize,
        setPageSize
    } = talonProps
    console.log("TALON PROPS", talonProps)
    /*
    fake data
    */
    // blogData = data;
    const simiBlogConfiguration = storage.getItem('simiBlogConfiguration');

    let linkColor = '#1ABC9C';
    if (simiBlogConfiguration && simiBlogConfiguration.general && simiBlogConfiguration.general.font_color) {
        linkColor = simiBlogConfiguration.general.font_color;
    }

    useEffect(() => {
        if (blogLoading) {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }, [blogLoading]);

    if (blogLoading)
        return <LoadingIndicator />
    if (blogError || !blogData)
        return ''
    let lofBlogList = null;
    // if (filterType == "get_post_by_categoryId") {
    //     lofBlogList = blogData.posts
    // }
    // if ((!lofBlogList.items || !lofBlogList.total_count) && !lofBlogList.posts)
    //     return <div className={classes.blogEmpty} >{'There are no posts at this moment'}</div>
    let blogsWrapper = null;
    if (filterType == "get_post_by_categoryId") {
        lofBlogList = blogData.lofBlogCategoryById
        if (!lofBlogList.posts) {
            return <div className={classes.blogEmpty} >{'There are no posts at this moment'}</div>
        }
        if (blogLoading) {
            return <LoadingIndicator/>
        }
        blogsWrapper = lofBlogList.posts.map((item, index) => 
            <React.Fragment key={index}>
                <BlogListingItem classes={classes} item={item} key={item.post_id} simiBlogConfiguration={simiBlogConfiguration} />
            </React.Fragment>
        )
    }
    else {
        lofBlogList = blogData.lofBlogList
        if (!lofBlogList.items || !lofBlogList.total_count) {
            return <div className={classes.blogEmpty} >{'There are no posts at this moment'}</div>
        }
        blogsWrapper = lofBlogList.items.map((item, index) =>
            <React.Fragment key={index}>
                <BlogListingItem classes={classes} item={item} key={item.post_id} simiBlogConfiguration={simiBlogConfiguration} />
            </React.Fragment>
        )
    }
    // const mpBlogPosts = data;
    return (
        <div className={classes.blogListingCtn} >
            {blogsWrapper}
            <style dangerouslySetInnerHTML={{
                __html: `
                .${classes.blogpostItem} h2 { color: ${linkColor} }
                .${classes.readMore} { color: ${linkColor} }
            `}} />
            <div className={classes.pagination}>
                <Pagination pageControl={pageControl} />
            </div>
            <div className={classes.pageSize}>
                {`Show `}
                <span className={classes.pageSizeInput}>
                    <select
                        onChange={e => {
                            setPageSize(e.target.value); pageControl.setPage(1)
                        }
                        }
                        value={pageSize}
                    >
                        <option value="5" >5</option>
                        <option value="10" >10</option>
                        <option value="20" >20</option>
                    </select>
                </span>
                {` per page`}
            </div>
        </div>
    )
}
export default BlogListing