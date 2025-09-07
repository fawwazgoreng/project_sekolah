
export async function BeritaGet() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/berita`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
}

export async function BeritaGetId(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/berita/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
}

export async function BeritaAdd(props: { judul: string; deskripsi: string; tanggal: string; gambar: File }) {
  const formData = new FormData();
  formData.append("judul", props.judul);
  formData.append("deskripsi", props.deskripsi);
  formData.append("tanggal", props.tanggal);
  formData.append("gambar", props.gambar);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/berita`, {
      method: "POST",
      body: formData,
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return { status: false, message: "Gagal menambahkan berita" };
  }
}

export async function BeritaDelete(id: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/berita/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return { status: false, message: "Gagal menghapus berita" };
  }
}
