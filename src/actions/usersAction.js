import axios from 'axios'

export const setUsers = (users) => {
    return {
        type:'SET_USERS',
        payload:users
    }
}

 export const startGetUsers = (pageNo) => {
     
    return(dispatch)=>{
        
        axios.get(`https://api.github.com/search/users?q=bangalore+in:location&page=${pageNo}&per_page=10`)
        .then((response)=>{
            console.log(Math.ceil(response.data.total_count / 10))
    
            const users = response.data.items
            dispatch(setUsers(users))
        })
    }
}

export const startGetSearch = (id) => {
    return(dispatch) => {
        axios.get(`https://api.github.com/search/users?q=${id}i&bangalore+in:location`)
        .then((response)=>{
            console.log(response.data)
            const users = response.data.items
            dispatch(setUsers(users))
        })
    }
}



