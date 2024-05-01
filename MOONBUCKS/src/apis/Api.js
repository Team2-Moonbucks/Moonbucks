import axios from 'axios';

const DOMAIN = 'http://localhost:4000';

export const request = async (method, url, data) => {
    return await axios({
            method,
            url : `${DOMAIN}${url}`,
            data
    })
    .then((res) => {
        return res.data;
    })
    .catch(error => {
        console.log('error : ',error);
        return error;
    });
};
