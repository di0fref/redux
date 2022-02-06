function getHeaders() {

    return {
        "token": localStorage.getItem("api_token") || null,
        'Content-Type': 'application/json'
    }
}


export default getHeaders
