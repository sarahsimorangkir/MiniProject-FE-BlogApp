import client from "../../graphql/apollo-client"
import { QUERY_ALL_FEEDS, QUERY_ALL_FEEDS_MOSTLY_VIEWED } from "../../graphql/apollo-query"

export const actionChangeGlobalRedux = (data)=>{
    return (dispatch)=>{
        return dispatch({type : data.type, value: data.value})
    }
}

export const actionGetAllFeeds = (data)=>(dispatch)=>{
    return new Promise((resolve, reject)=>{ 
        client.query({query:QUERY_ALL_FEEDS, variables:{limit:data.limit, offset:data.offset}}).then((result)=>{
            dispatch({type : "CHANGE_FEEDS", value : result.data.feeds})
           resolve(result.data)
        }).catch((err)=>{
            reject(err)
            
        })
    })
}

export const actionGetAllFeedsMostlyViewed = ()=>(dispatch)=>{
    return new Promise((resolve, reject)=>{ 
        client.query({query:QUERY_ALL_FEEDS_MOSTLY_VIEWED}).then((result)=>{ 
            dispatch({type : "CHANGE_FEEDS_MOSTLY_VIEWED", value : result.data.feeds})
           resolve(result.data)
        }).catch((err)=>{
            reject(err)
            
        })
    })
}