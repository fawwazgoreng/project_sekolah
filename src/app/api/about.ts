
export async function AboutFasilitasGet() {
    const response = await fetch(`${process.env.NEXTBASEURL}/` , {
        method: "get",
        headers: {
            "Content-type":"apllication/json"
        },
    }).then(item => item.json());
    return response;
}

export async function AboutFasilitasAdd(props:{name: string; picture: File }) {
    const response = await fetch(`${process.env.NEXTBASEURL}/` , {
        method: "post",
        headers: {
            "Content-type":"apllication/json"
        },
        body: JSON.stringify({
            name:props.name,
            picture:props.picture,
        })
    }).then(item => item.json());
    return response;
}
export async function AboutFasilitasDelete(props:{id: number;}) {
    const response = await fetch(`${process.env.NEXTBASEURL}/` , {
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


export async function AboutExtraGet() {
    const response = await fetch(`${process.env.NEXTBASEURL}/` , {
        method: "get",
        headers: {
            "Content-type":"apllication/json"
        },
    }).then(item => item.json());
    return response;
}

export async function AboutExtraAdd(props:{name: string;}) {
    const response = await fetch(`${process.env.NEXTBASEURL}/` , {
        method: "post",
        headers: {
            "Content-type":"apllication/json"
        },
        body: JSON.stringify({
            name:props.name,
        })
    }).then(item => item.json());
    return response;
}
export async function AboutExtraDelete(props:{id: number;}) {
    const response = await fetch(`${process.env.NEXTBASEURL}/` , {
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

export async function AboutprogramGet() {
    const response = await fetch(`${process.env.NEXTBASEURL}/` , {
        method: "get",
        headers: {
            "Content-type":"apllication/json"
        },
    }).then(item => item.json());
    return response;
}

export async function AboutprogramAdd(props:{name: string;}) {
    const response = await fetch(`${process.env.NEXTBASEURL}/` , {
        method: "post",
        headers: {
            "Content-type":"apllication/json"
        },
        body: JSON.stringify({
            name:props.name,
        })
    }).then(item => item.json());
    return response;
}
export async function AboutprogramDelete(props:{id: number;}) {
    const response = await fetch(`${process.env.NEXTBASEURL}/` , {
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
