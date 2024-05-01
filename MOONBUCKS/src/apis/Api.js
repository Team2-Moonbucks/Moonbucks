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
        if(error.response.status === 404){
            console.log('잘못된 요청!')
            alert('잘못된 요청입니다!');
            window.location.href = '/error';

        }
    });
};
