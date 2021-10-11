import { login } from '@/services/auth';

const KEY_TOKEN = 'token';
const KEY_EMAIL = 'email';
const KEY_NAME = 'name';

const auth = {
    state: {
        token: localStorage.getItem( KEY_TOKEN ) || '',
        email: localStorage.getItem( KEY_EMAIL ) || '',
        name: localStorage.getItem( KEY_NAME ) || ''
    },
    getters: {
        isAuthenticated( state ) {
            return !!state.token; 
        }
    },
    mutations: {
        setToken( state, token ) {
            state.token = token;
        },
        setEmail( state, email ) {
            state.email = email;
        },
        setName( state, name ) {
            state.name = name;
        }
    },
    actions: {
        login( { commit }, credentials ) {
            return login( credentials )
                        .then( data => {
                            const { token, email, name } = data
        
                            localStorage.setItem( KEY_TOKEN, token );
                            localStorage.setItem( KEY_EMAIL, email );
                            localStorage.setItem( KEY_NAME, name );
        
                            commit( 'setToken', token );
                            commit( 'setEmail', email );
                            commit( 'setName', name );
        
                            return email,name;
                        });
        },
        logout( { commit } ) {
            localStorage.removeItem( KEY_TOKEN );
            localStorage.removeItem( KEY_EMAIL );
            localStorage.removeItem( KEY_NAME );
        
            commit( 'setToken', '' );
            commit( 'setEmail', '' );
            commit( 'setName', '' );

            return Promise.resolve();
        }
    }
}

export default auth;