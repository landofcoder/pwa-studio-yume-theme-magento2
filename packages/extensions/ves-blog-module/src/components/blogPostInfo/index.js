// import React from 'react';
// import { Link } from '@magento/venia-drivers';
// import Icon from '@landofcoder/yume-ui/src/components/Icon';
// import { Calendar as CalendarIc, User as AuthorIc, Eye as EyeIc } from 'react-feather';

// import { Util } from '@magento/peregrine';
// const { BrowserPersistence } = Util;
// const storage = new BrowserPersistence();

// const calenderIcon = <Icon src={CalendarIc} attrs={{ width: 11 }} />;
// const authorIcon = <Icon src={AuthorIc} attrs={{ width: 11 }} />;
// const eyeIcon = <Icon src={EyeIc} attrs={{ width: 11 }} />;

// const BlogPostInfo = props => {
//     const { classes, item } = props;
//     const {
//         publish_date,
//         categories,
//         author_name,
//         author_id,
//         author_url_key,
//         view_traffic
//     } = item;

//     const {
//         creation_time,
//         category_id,
//         hits,
//         author
//     } = item

//     const simiBlogConfiguration = storage.getItem('simiBlogConfiguration');
//     console.log("Storage", simiBlogConfiguration)
//     let displayAuthor = false;
//     if (simiBlogConfiguration && simiBlogConfiguration.general && simiBlogConfiguration.general.display_author) {
//         displayAuthor = true;
//     }

//     return (
//         <div className={classes.blogpostInfo}>
//             <span className={classes.calendarIcon}>
//                 {calenderIcon}
//             </span>
//             <span className={classes.calendarData}>
//                 {creation_time}
//             </span>
//             {
//                 (category_id && category_id && category_id.length) ?
//                     <React.Fragment>
//                         | <span className={classes.categoryData}>
//                             {`Post In`} {
//                                 category_id.map(
//                                     (categoryItem, index) =>
//                                         <React.Fragment key={index}>
//                                             <Link to={`/blog/category/${categoryItem}`}>
//                                                 {categoryItem}
//                                             </Link>
//                                             {(index < (category_id.length - 1)) ? ',' : ''}
//                                         </React.Fragment>
//                                 )
//                             }
//                         </span>
//                     </React.Fragment>
//                     :
//                     ''
//             }
//             {
                
//                 <React.Fragment> |
//                     <span className={classes.authorIcon}>
//                         {authorIcon}
//                     </span>
//                     <span className={classes.authorName}>
//                         <Link to={`/blog/author/${author.user_name}.html?author_name=${author_name}&author_id=${author.author_id}`}>
//                             {author.nick_name}
//                         </Link>
//                     </span>
//                 </React.Fragment>
//             } |
//             <span className={classes.eyeIcon}>
//                 {eyeIcon}
//             </span>
//             <span className={classes.viewCount}>{hits}</span>
//         </div>
//     )
// }
// export default BlogPostInfo

import React from 'react';
import { Link } from '@magento/venia-drivers';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { Calendar as CalendarIc, User as AuthorIc, Eye as EyeIc } from 'react-feather';

import { Util } from '@magento/peregrine';
const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();

const calenderIcon = <Icon src={CalendarIc} attrs={{ width: 11 }} />;
const authorIcon = <Icon src={AuthorIc} attrs={{ width: 11 }} />;
const eyeIcon = <Icon src={EyeIc} attrs={{ width: 11 }} />;

const BlogPostInfo = props => {
    const { classes, item } = props;
    const {
        publish_date,
        categories,
        author_name,
        author_id,
        author_url_key,
        view_traffic
    } = item;

    const {
        creation_time,
        category_id,
        hits,
        author
    } = item

    const simiBlogConfiguration = storage.getItem('simiBlogConfiguration');
    let displayAuthor = false;
    if (simiBlogConfiguration && simiBlogConfiguration.general && simiBlogConfiguration.general.display_author) {
        displayAuthor = true;
    }

    return (
        <div className={classes.blogpostInfo}>
            <span className={classes.calendarIcon}>
                {calenderIcon}
            </span>
            <span className={classes.calendarData}>
                {publish_date}
            </span>
            {
                (category_id && category_id && category_id.length) ?
                <React.Fragment>
                    | <span className={classes.categoryData}>
                        {`Post In`} {
                            category_id.map(
                                (categoryItem, index) =>
                                    <React.Fragment key={index}>
                                        <Link to={`/blog/category/${categoryItem}`}>
                                            {categoryItem}
                                        </Link>
                                        {(index < (category_id.length - 1)) ? ',' : ''}
                                    </React.Fragment>
                            )
                        }
                    </span>
                </React.Fragment>
                :
                ''
            }
            {
                displayAuthor &&
                <React.Fragment> |
                    <span className={classes.authorIcon}>
                        {authorIcon}
                    </span>
                    <span className={classes.authorName}>
                        <Link to={`/blog/author/${author.user_name}.html?author_name=${author_name}&author_id=${author.author_id}`}>
                            {author.nick_name}
                        </Link>
                    </span>
                </React.Fragment>
            } |
            <span className={classes.eyeIcon}>
                {eyeIcon}
            </span>
            <span className={classes.viewCount}>{view_traffic}</span>
        </div>
    )
}
export default BlogPostInfo