

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


export async function SlideAdd(formdata: FormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/slide`, {
      method: "POST",
      body: formdata, // langsung kirim formdata
    });

    return await response.json();
  } catch (err) {
    console.error(err);
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
