
export async function fetchOneUser(body) {
    const options = makeOptions("POST",body)
    const response = await fetch("/api/login",options)
    return await response.json()
    if (response.ok) {
        return await response.json()
    } else if(response.status == 429) { //too many requests
        return 429;
    } 
    else if (response.status == 404){
        //error TODO: return something valuable?
        return null;
    }
}

export function makeOptions(method, body) {
    const opts = {
        method: method,
        mode: "cors",
        credentials: "include", //sender cookie med
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) { //Observe how we can add new fields to an object when needed
        opts.body = JSON.stringify(body);
    }
    return opts;
}
// kode lol
export async function insertCustomer(body) {
    const options = makeOptions("POST",body)
    const response = await fetch(url+"/customer/",options);
    if (response.ok) {
        const responseData = await response.json()
        return responseData
    } else {
        console.log("Customer wasnt created");
    }
}