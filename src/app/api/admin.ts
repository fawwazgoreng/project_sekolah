
export async function AdminGet() {
    const response = await fetch(`${process.env.NEXTBASEURL}` , {
        method: "get",
        headers: {
            "Content-type":"apllication/json"
        },
    }).then(item => item.json());
    return response;
}

export async function AdminAdd(props:{username: string; password: string;}) {
    const response = await fetch(`${process.env.NEXTBASEURL}` , {
        method: "post",
        headers: {
            "Content-type":"apllication/json"
        },
        body: JSON.stringify({
            username:props.username,
            password:props.password,
        })
    }).then(item => item.json());
    return response;
}
export async function AdminDelete(props:{id: number;}) {
    const response = await fetch(`${process.env.NEXTBASEURL}` , {
        method: "post",
        headers: {
            "Content-type":"apllication/json"
        },
        body: JSON.stringify({
            id:props.id
        })
    }).then(item => item.json());
    return response;
}
