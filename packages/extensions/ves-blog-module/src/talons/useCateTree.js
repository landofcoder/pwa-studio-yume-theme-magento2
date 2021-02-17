import React from 'react';
import { GET_BLOG_CATEGORIES, GET_BLOG_CATEGORIES_LIST } from './Blog.gql'
import { useQuery } from '@apollo/client';
import LoadingIndicator from '@landofcoder/yume-ui/src/components/LoadingIndicator';

const unflatten = (arr) => {
    let tree = [];
    let mappedArr = {};
    let arrElem;
    let mappedElem;

    for (var i = 0, len = arr.length; i < len; i++) {
        arrElem = arr[i];
        arrElem.label = arrElem.name;
        mappedArr[arrElem.category_id] = arrElem;
        mappedArr[arrElem.category_id]['children'] = [];
    }

    for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];
            if (mappedElem.parent_id) {
                mappedArr[mappedElem['parent_id']]['children'].push(mappedElem);
            }
            else {
                tree.push(mappedElem);
            }
        }
        const unflatten = (arr) => {
            let tree = [];
            let mappedArr = {};
            let arrElem;
            let mappedElem;
        
            for (var i = 0, len = arr.length; i < len; i++) {
                arrElem = arr[i];
                arrElem.label = arrElem.name;
                mappedArr[arrElem.category_id] = arrElem;
                mappedArr[arrElem.category_id]['children'] = [];
            }
        
            for (var id in mappedArr) {
                if (mappedArr.hasOwnProperty(id)) {
                    mappedElem = mappedArr[id];
                    if (mappedElem.parent_id) {
                        mappedArr[mappedElem['parent_id']]['children'].push(mappedElem);
                    }
                    else {
                        tree.push(mappedElem);
                    }
                }
            }
            return tree;
        }}
    return tree;
}
const dataCleaning = ((categoryArray, classes) => {
    let groupCategory = [];
    groupCategory.push({
        value: 0,
        label: "All"
    })
    categoryArray.map((category, index) => {
        console.log(category.image)
        const item = {
            value: category.category_id,
            label: <React.Fragment key={index}>
                <img src={category.image ? `http://magento2.landofcoder.com/media/${category.image}` : ''} width={32} height={32} />
                <p style={{ padding: "9px 0 0 15px" }}>{category.name}</p>
            </React.Fragment>
        }
        item['className'] = classes.customOptionCategory
        groupCategory.push(item)
    })
    
    return groupCategory
})
const conditionFunc = (category) => {
    return
}
const groupCategoryHandle = ((categoryArray) => {
    const length = categoryArray.length;
    // const singletonCategory = categoryArray.map((category) => {
    //     if (!category.parent_id) {
    //         category = {...category, children: []}
    //         return category
    //     }
    // })
    // let singletonCategory = [];
    // for (let i = 0; i < length; i++) {
    //     if (!categoryArray[i].parent_id) {
    //         singletonCategory.push({...categoryArray[i], children: []})
    //     }
    // }
    // console.log("CATEGORY LOOP1", singletonCategory)
    // for (let i = 0; i < length; i++) {
    //     if (categoryArray[i].parent_id) {
    //         for (let j = 0; j < singletonCategory.length; j++) {
    //             if (singletonCategory[j].category_id == categoryArray[i].parent_id) {
    //                 singletonCategory[j].children.push(categoryArray[i])
    //                 break;
    //             }
    //         }
    //     }
    // }
    let result = [];
    for (let i = 0; i < length; i++) {
        let parent = {...categoryArray[i], children: []}
        if (!parent.parent_id) {
            for (let j = 0; j < length; j++) {
                if (categoryArray[i].parent_id == parent.category_id) {
                    parent.children.push(categoryArray[i])
                }
            }
            result.push(parent)

        }
    }
    console.log("CATEGORY", result)
})
export const useCateTree = props => {
    // console.log("PROPS", props)
    const {
        data: cateData,
        loading: cateLoading,
        error: cateError
    } = useQuery(GET_BLOG_CATEGORIES_LIST, {
        variables: {
            search: "",
            pageSize: 20,
            currentPage: 1
        }
    })

    let dataCateTree = [];
    // if (cateData && cateData.mpBlogCategories &&
    //     cateData.mpBlogCategories.items &&
    //     cateData.mpBlogCategories.items.length) {
    //     let dataCateFlat = JSON.parse(JSON.stringify(cateData.mpBlogCategories.items));
    //     dataCateTree = unflatten(dataCateFlat);
    //     //skip the root
    //     if (dataCateTree && dataCateTree[0] && dataCateTree[0].children)
    //         dataCateTree = dataCateTree[0].children
    //     else
    //         dataCateTree = []
    // }
    if (cateLoading) {
        return <LoadingIndicator />
    }
    if (cateError) {
        console.log(cateError)
        return null
    }
    if (cateData && cateData.lofBlogCategoryList && cateData.lofBlogCategoryList.items) {
        console.log("DATA HERE", cateData)
        dataCateTree = dataCleaning(cateData.lofBlogCategoryList.items, props)
        // groupCategoryHandle(cateData.lofBlogCategoryList.items)
        return {
            dataCateTree,
            cateLoading,
        }
    }
    // return {
    //     dataCateTree,
    //     cateLoading,
    // }
}