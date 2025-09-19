export async function PrestasiGet() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/prestasi`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
}

export async function PrestasiAdd(props: { title: string; picture: File; desc: string }) {
  const formData = new FormData();
  formData.append("judul", props.title);
  formData.append("deskripsi", props.desc);
  formData.append("gambar", props.picture);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/prestasi`, {
    method: "POST",
    body: formData,
  });

  return await res.json();
}

export async function PrestasiDelete(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/prestasi/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }, // optional
  });
  return await res.json();
}

// Optional: Get a specific prestasi by ID
export async function PrestasiGetId(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/prestasi/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
}

export async function PrestasiEdit(props: { 
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/prestasi/${props.id}`, {
    method: "POST", // tetap POST karena pakai _method
    body: formData,
  });

  return await res.json();
}
