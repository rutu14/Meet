import axios from 'axios';
import AppConfig from '@/config';

const { apiBaseUrl } = AppConfig;

const getTeams = async () => {
    const response = await axios.get( `${apiBaseUrl}/teams` );
    return response.data
};
const addTeams = async (teamDetails) => {
    const response = await axios.post( `${apiBaseUrl}/team` ,
    teamDetails,
    {
        headers: {
            ContentType: "application/json"            
        }        
    });
    return response.data
};
const addMemberToTeam = async ( id, email ) => {
    const response = await axios.patch( `${apiBaseUrl}/teams/${id}?action=add_member&email=${email}` );
    return response.data
};

const removeSelfFromTeam = async ( id ) => {
    const response = await axios.patch( `${apiBaseUrl}/teams/${id}?action=remove_member` );
    return response.data
};

export {
    getTeams,
    addTeams,
    addMemberToTeam,
    removeSelfFromTeam
};