import React from 'react'
import { gql, useQuery } from "@apollo/client"
import actions from './action'

export const getStoreConfig = (data) => {
    return (dispatch) => {
        try {
            dispatch(actions.storeConfig.receive(data))
        }
        catch(e) {
            console.log(e)
        }
    }
}