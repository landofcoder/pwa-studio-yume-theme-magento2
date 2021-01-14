import React from 'react';
import { Link } from '@magento/venia-drivers';
// import BlogPostInfo from '../blogPostInfo'
import RichText from '@landofcoder/yume-ui/src/components/RichText'

const BlogListingItem = props => {
    const { classes, item, simiBlogConfiguration } = props;
    // const {
    //     name,
    //     url_key,
    //     short_description,
    //     image
    // } = item;
    const {
        title,
        identifier,
        short_content,
        image
    } = item;
    // console.log("ITEM", item)
    let linkColor = '#1ABC9C';
    if (simiBlogConfiguration && simiBlogConfiguration.general && simiBlogConfiguration.general.font_color) {
        linkColor = simiBlogConfiguration.general.font_color;
    }
    let displayStyle = 1;
    if (simiBlogConfiguration && simiBlogConfiguration.general && simiBlogConfiguration.general.display_style) {
        displayStyle = parseInt(simiBlogConfiguration.general.display_style);
    }
    return (
        <div className={`${classes.blogpostItem} ${displayStyle === 1 ? classes.blogpostItemList : classes.blogpostItemGrid}`}>
            {image ? <div className={classes.blogpostItemCol1} >
                <img src={image} alt={title} />
            </div> : ''}
            <div className={classes.blogpostItemCol2} >
                <h2>
                    <Link to={`/blog/post/${identifier}.html`} style={{ color: linkColor }}>
                        {title}
                    </Link>
                </h2>
                {/* <BlogPostInfo item={item} classes={classes} /> */}
                <div className={classes.blogpostDescription}>
                    <RichText classes={{ root: classes.blogpostDescriptionRichtext }} content={short_content} />
                </div>
                <Link to={`/blog/post/${identifier}.html`}>
                    <div className={classes.readMore}>
                        {'Read More'}
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default BlogListingItem