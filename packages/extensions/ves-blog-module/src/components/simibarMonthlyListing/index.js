import React from 'react'
import classes from './style.css'
import { GET_BLOG_ARCHIVE } from '../../talons/Blog.gql'
import { useQuery } from '@apollo/client';
import { Link } from '@magento/venia-drivers';
import Icon from '@landofcoder/yume-ui/src/components/Icon';
import { Calendar as CalendarIc } from 'react-feather';
import LoadingIndicator from '@landofcoder/yume-ui/src/components/LoadingIndicator';

const calendarIcon = <Icon src={CalendarIc} attrs={{ width: 13 }} />;
const months = [
    undefined,
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

const timeArchiveFormat = (archiveTime) => {
    const arr = archiveTime.split('-')
    const montIndex = parseInt(arr.pop())
    return months[montIndex].concat(" ", arr[0])
}

const SimibarMonthlyListing = props => {
    const {
        data,
        error,
        loading
    } = useQuery(GET_BLOG_ARCHIVE)
    if (loading) {
        return <LoadingIndicator />
    }
    if (error) {
        return 'Can not find items'
    }
    // if (data) {
    //     console.log("Data", data)
    //     const time = data.lofBlogArchive[0].time
    //     const timeArray = time.split('-')
    //     const month = parseInt(timeArray.pop())
    //     console.log("after pop", timeArray)
    //     const timeFormatted = months[month].concat(" ", timeArray[0])
    //     console.log("Time formatted", timeFormatted)
    // }

    // if (archiveListData && archiveListData.mpBlogMonthlyArchive && archiveListData.mpBlogMonthlyArchive.items) {
    //     const archiveItems = archiveListData.mpBlogMonthlyArchive.items;
    //     return (
    //         <div className={classes.listRoot}>
    //             <div className={classes.listHeader}>{`Monthly Archive`}</div>
    //             <div className={classes.listItems}>
    //                 {archiveItems.map((archiveItem, index) => {
    //                     try {
    //                         let archiveData = new Date(archiveItem.label);
    //                         if (archiveData && archiveData.getFullYear() && archiveData.getMonth()) {
    //                             return (
    //                                 <Link className={classes.listItem} to={`/blog/month/${(archiveData.getFullYear())}-${(archiveData.getMonth() + 1)}.html`} key={archiveItem.label}>
    //                                     {calendarIcon} {archiveItem.label} ({archiveItem.quantity})
    //                                 </Link>
    //                             )
    //                         }
    //                     } catch (err) {

    //                     }
    //                 })}
    //             </div>
    //         </div>
    //     )
    // }
    // return ''
    return (
        <div className={classes.archiveContainer}>
            <div className={classes.listArchiveHeader}>{`Monthly Archive`}</div>
            <ul className={classes.archiveContainer}>
                {data.lofBlogArchive.map((item, index) => {
                    const arr = item.time.split('-')
                    return (
                        <li key={index} >
                        <Link className={classes.archiveItemContainer} to={`/blog/date/${arr[0]}/${arr[1]}`}>
                            {timeArchiveFormat(item.time)} ( {item.count} )
                        </Link>
                    </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SimibarMonthlyListing