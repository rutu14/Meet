import axios from 'axios';
import AppConfig from '@/config';

const { apiBaseUrl } = AppConfig;

export const register = async (credentials) => {
    const response = await  axios.post( `${apiBaseUrl}/auth/register`,
                    credentials,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(credentials)
                    })
    return response;            
};
