
export async function VisimisiGet() {
    const response = await fetch(`${process.env.NEXTBASEURL}` , {
        method: "get",
        headers: {
            "Content-type":"apllication/json"
        },
    }).then(item => item.json());
    return response;
}

export async function VisimisiAdd(props:{title:string ; desc: string;}) {
    const response = await fetch(`${process.env.NEXTBASEURL}` , {
        method: "post",
        headers: {
            "Content-type":"apllication/json"
        },
        body: JSON.stringify({
            title:props.title,
            desc:props.desc,
        })
    }).then(item => item.json());
    return response;
}
export async function VisimisiDelete(props:{id: number;}) {
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
