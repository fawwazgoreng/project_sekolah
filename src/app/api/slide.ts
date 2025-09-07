

export async function SlideGet() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/slide`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}


export async function SlideAdd(props:{picture: File ;}) {
    try {const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/slide` , {
        method: "post",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            picture:props.picture,
        })
    }).then(item => item.json());
    return response;} catch (err) {
        console.log(err)
    }
}
export async function SlideDelete(props: { id: number }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/slide/${props.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: props.id }),
    }
  );
  if (!response.ok) {
    throw new Error("Gagal menghapus slide");
  }
  return await response.json();
}
