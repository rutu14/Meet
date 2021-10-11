import axios from 'axios';
import config from '@/config';
// import { successHandler, errorHandler } from './helper';

export const login = ( loginDetails ) => {
    return axios.post( `${config.apiBaseUrl}/auth/login`,
                loginDetails,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
                .then( response => response.data )
                .catch( error => {
                    console.log( error.message );
                    throw error;
                } );
};

