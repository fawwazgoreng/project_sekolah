export async function programsekolahGet() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/programsekolah`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
}

export async function programsekolahAdd(props: { title: string; picture: File; desc: string }) {
  const formData = new FormData();
  formData.append("judul", props.title);
  formData.append("deskripsi", props.desc);
  formData.append("gambar", props.picture);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/programsekolah`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
}

export async function programsekolahDelete(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/programsekolah/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }, // optional
  });
  return await res.json();
}

// Optional: Get a specific programsekolah by ID
export async function programsekolahGetId(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/programsekolah/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
}

export async function programsekolahEdit(props: { 
  id: number | null; 
  title: string; 
  desc: string; 
  picture?: File 
}) {
  if (!props.id) return { status: false };

  const formData = new FormData();
  formData.append("judul", props.title);
  formData.append("deskripsi", props.desc);
  if (props.picture) formData.append("gambar", props.picture);
  // trik agar Laravel baca sebagai PUT
  formData.append("_method", "PUT");  

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/programsekolah/${props.id}`, {
    method: "POST", // tetap POST karena pakai _method
    body: formData,
  });

  return await res.json();
}
