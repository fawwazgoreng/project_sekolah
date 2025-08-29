

export async function SlideGet() {
    const response = await fetch(`${process.env.NEXTBASEURL}` , {
        method: "get",
        headers: {
            "Content-type":"apllication/json"
        },
    }).then(item => item.json());
    return response;
}

export async function SlideAdd(props:{picture: File ;}) {
    const response = await fetch(`${process.env.NEXTBASEURL}` , {
        method: "post",
        headers: {
            "Content-type":"apllication/json"
        },
        body: JSON.stringify({
            picture:props.picture,
        })
    }).then(item => item.json());
    return response;
}
export async function SlideDelete(props:{id: number;}) {
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
