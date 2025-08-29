
export async function SejarahGet() {
    const response = await fetch(`${process.env.NEXTBASEURL}` , {
        method: "get",
        headers: {
            "Content-type":"apllication/json"
        },
    }).then(item => item.json());
    return response;
}

export async function SejarahAdd(props:{title: string; picture: File ; desc: string;}) {
    const response = await fetch(`${process.env.NEXTBASEURL}` , {
        method: "post",
        headers: {
            "Content-type":"apllication/json"
        },
        body: JSON.stringify({
            title:props.title,
            desc:props.desc,
            picture:props.picture,
        })
    }).then(item => item.json());
    return response;
}
export async function SejarahDelete(props:{id: number;}) {
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
