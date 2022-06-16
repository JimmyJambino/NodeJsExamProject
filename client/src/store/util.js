
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