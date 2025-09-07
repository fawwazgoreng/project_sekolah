export async function AdminGet(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/admin`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Error ${response.status}: ${text}`);
  }

  return response.json();
}

export async function AdminAdd(props:{username: string; password: string;}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/admin` , {
        method: "post",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            username:props.username,
            password:props.password,
        })
    }).then(item => item.json());
    return response;
}
export async function AdminDelete(props:{id: number;}) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/admin` , {
        method: "post",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            id:props.id
        })
    }).then(item => item.json());
    return response;
}
