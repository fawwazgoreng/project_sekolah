
export async function PrestasiGet() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/prestasi` , {
        method: "get",
        headers: {
            "Content-type":"application/json"
        },
    }).then(item => item.json());
    return response;
}

export async function PrestasiAdd(props:{title: string; picture: File ; desc: string;}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/prestasi` , {
        method: "post",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            title:props.title,
            desc:props.desc,
            picture:props.picture,
        })
    }).then(item => item.json());
    return response;
}
export async function PrestasiDelete(props:{id: number;}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/prestasi/${props.id}` , {
        method: "DELETE",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            id:props.id
        })
    }).then(item => item.json());
    return response;
}
