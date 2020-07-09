import axios from './http';

function postInfo() {
    return axios.post('./postinfo',{})
}

export default postInfo