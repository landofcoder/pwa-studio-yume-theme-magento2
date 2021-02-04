import React, {useCallback, useMemo} from 'react';
import { useCateTree } from '../../talons/useCateTree'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'
import classes from './cateTree.css'
import { useHistory } from '@magento/venia-drivers';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Redirect } from 'react-router-dom';

const CateTree = props => {
    const { categoryId, selectCategory } = props;
    const { dataCateTree } = useCateTree(classes)
    // const dataCateTree = useMemo(() => useCateTree(classes), [])
    // console.log(dataCateTree)
    const history = useHistory();
    // console.log("ABABABABA", dataCateTree)
    if (!dataCateTree || !dataCateTree.length)
        return ''
    // console.log(dataCateTree)
    // const options = [
    //     { value: 'one', label: <p>asasasas</p> },
    //     { value: 'two', label: 'Two', className: 'myOptionClassName' },
    //     {
    //         type: 'group', name: 'group1', items: [
    //             { value: 'three', label: 'Three', className: 'myOptionClassName' },
    //             { value: 'four', label: 'Four' }
    //         ]
    //     },
    //     {
    //         type: 'group', name: 'group2', items: [
    //             { value: 'five', label: 'Five' },
    //             { value: 'six', label: 'Six' }
    //         ]
    //     }
    // ];
    // const handle = useCallback((event) => {
    //     event.value != 0 ? history.push(`/blog/category/${event.value}?page=${1}`): history.push("/blog.html")
    // }, [])
    const handle = (event) => {
        event.value != 0 ? history.push(`/blog/category/${event.value}?page=${1}`): history.push("/blog.html")
    }
    const defaultOption = dataCateTree[0]
    return (
        <div className={classes.catetreeRoot}>
            <div className={classes.catetreeHeader}>{`Categories`}</div>
                <Dropdown
                    placeholderClassName={classes.placeholderCategory}
                    options={dataCateTree}
                    value={defaultOption}
                    placeholder="Select an option"
                    controlClassName={classes.controlCategory}
                    onChange={handle}
                />
        </div>
    )
}
export default CateTree