import React from 'react';
import classes from './tagList.css'
import { GET_BLOG_TAGS, GET_TAGS_LIST } from '../../talons/Blog.gql'
import { useQuery } from '@apollo/client';
import { Link } from '@magento/venia-drivers';
import { Util } from '@magento/peregrine';
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const TagList = () => {
    const {
        data: tagListData
    } = useQuery(GET_TAGS_LIST)

    const simiBlogConfiguration = storage.getItem('simiBlogConfiguration');
    let linkColor = '#1ABC9C';
    if (simiBlogConfiguration && simiBlogConfiguration.general && simiBlogConfiguration.general.font_color) {
        linkColor = simiBlogConfiguration.general.font_color;
    }

    if (tagListData && tagListData.lofBlogTagList && tagListData.lofBlogTagList.items) {
        const tagItems = tagListData.lofBlogTagList.items;
        const maxFontSize = 26;
        let postNumber = 1;
        // tagItems.map(tagItem => {
        //     try {
        //         const itemPostNum = tagItem.posts.items.length;;
        //         postNumber += parseInt(itemPostNum)
        //     } catch (err) {

        //     }
        // });
        return (
            <div className={classes.tagListRoot}>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .${classes.tagItem}:hover { color: ${linkColor} }
                `}} />
                <div className={classes.tagListHeader}>{`Tags`}</div>
                <div className={classes.tagItems}>
                    {tagItems.map((tagItem, index) => {
                        let tagFontSize = 10;
                        // try {
                        //     tagFontSize = maxFontSize * parseInt(tagItem.post.items?.length) / postNumber;
                        //     tagFontSize = (Math.ceil(tagFontSize) + 8);
                        // } catch (err) {

                        // }
                        return (
                            <Link className={classes.tagItem} to={`/blog/tag/${tagItem.tag_id}`} style={{ fontSize: tagFontSize }} key={index}>
                                {tagItem.name}
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
    return ''
}
export default TagList