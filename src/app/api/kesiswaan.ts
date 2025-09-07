
export async function KesiswaanGet() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/kesiswaan` , {
        method: "get",
        headers: {
            "Content-type":"application/json"
        },
    }).then(item => item.json());
    return response;
}

export async function KesiswaanAdd(props:{title: string; picture: File ; desc: string;}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/kesiswaan` , {
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
export async function KesiswaanDelete(props:{id: string;}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/kesiswaan/${props.id}` , {
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
