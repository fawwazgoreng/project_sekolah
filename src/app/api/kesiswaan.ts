
export async function KesiswaanGet() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/kesiswaan` , {
        method: "get",
        headers: {
            "Content-type":"application/json"
        },
    }).then(item => item.json());
    return response;
}

export async function KesiswaanGetId(id:number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/kesiswaan/${id}` , {
        method: "GET",
        headers: {
            "Content-type":"application/json"
        },
    }).then(item => item.json());
    return response;
}

export async function KesiswaanAdd(props: { title: string; picture: File }) {
  const formData = new FormData();
  formData.append("judul", props.title);
  formData.append("gambar", props.picture);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/kesiswaan`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
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

export async function KesiswaanUpdate(id: number, formData: FormData) {
  formData.append("_method", "PUT");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/kesiswaan/${id}`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
}
