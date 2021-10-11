import axios from 'axios';
import AppConfig from '@/config';

const { apiBaseUrl } = AppConfig;

const getCalendar = async (date) => {
    const response = await axios.get( `${apiBaseUrl}/calendar`, {
        headers: {
            ContentType: "application/json",
        },
        params:{
            date: date
        }
    })
    return response.data
}
export {
    getCalendar
};