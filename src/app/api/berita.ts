
export async function BeritaGet() {
    const response = await fetch(`${process.env.NEXTBASEURL}` , {
        method: "get",
        headers: {
            "Content-type":"apllication/json"
        },
    }).then(item => item.json());
    return response;
}

export async function BeritaAdd(props:{title: string; picture: File ; desc: string;}) {
    try {
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
    } catch (err) {
        console.log(err);
    }
}
export async function BeritaDelete(props:{id: number;}) {
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
