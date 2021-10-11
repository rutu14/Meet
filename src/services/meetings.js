import axios from 'axios';
import AppConfig from '@/config';

const { apiBaseUrl } = AppConfig;

const getMeetings = async ( period,search ) => {
    const response = await axios.get( `${apiBaseUrl}/meetings`, {
        params:{
            period,
            search
        },
    });
    return response.data;
}

const addMeetings = async ( meetingDetails ) => {
    const response = await axios.post( `${apiBaseUrl}/meetings`, 
    meetingDetails,
    {
        headers: { ContentType: "application/json" },
        body: JSON.stringify(meetingDetails)
    });
    return response.data;
}

const addMember = async ( id, email ) => {
    const response = await axios.patch( `${apiBaseUrl}/meetings/${id}?action=add_attendee&email=${email}` );
    return response.data;
}

const removeSelf = async ( id ) => {
    const response = await axios.patch( `${apiBaseUrl}/meetings/${id}?action=remove_attendee` );
    return response.data;
}

export { getMeetings, addMeetings, addMember, removeSelf };