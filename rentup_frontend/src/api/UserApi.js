import Apis, {endpoints} from '../configs/App'

export const getCurrentUser = (access_token) => {
    return Apis.get(endpoints['current-user'], {
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })
    .then((response) => {return response.data})
    .catch((error) => console.error(error))
}

export const getAllUsers = () => {
    return Apis.get(endpoints['get-all-user'])
    .then((response) => {return response.data.results})
    .catch((error) => console.error(error))
}