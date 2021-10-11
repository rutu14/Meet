import axios from 'axios';
import AppConfig from '@/config';

const { apiBaseUrl } = AppConfig;

const getUsers = async () => {
    const response = await axios.get( `${apiBaseUrl}/users` )
    return response.data
};

const getUserID = (email) => {
    try{
        const data1 = getUsers();
        const objj = data1.find(obj => obj.email == email);
        console.log(objj);
        return objj;
    }catch(error){
        console.error(error.message);
    }
};


export {
    getUsers,getUserID
};
