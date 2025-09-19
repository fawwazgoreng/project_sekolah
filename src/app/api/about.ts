export async function AboutGet() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/about`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

export const AboutEdit = async ({
  id,
  judul,
  deskripsi,
  gambar,
}: {
  id: number;
  judul: string;
  deskripsi: string;
  gambar?: File;
}) => {
  try {
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);

    formData.append("_method", "PUT");

    if (gambar) formData.append("gambar", gambar);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/about/${id}`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("aboutEdit failed:", text);
      return { status: false, message: "Failed to update", raw: text };
    }
    return await res.json();
  } catch (err) {
    console.error("about Edit error:", err);
  }
};

export const AboutAdd = async ({
  judul,
  deskripsi,
  gambar,
}: {
  judul: string;
  deskripsi: string;
  gambar?: File;
}) => {
  try {
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    if (gambar) formData.append("gambar", gambar);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/about`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("aboutEdit failed:", text);
      return { status: false, message: "Failed to update", raw: text };
    }
    return await res.json();
  } catch (err) {
    console.error("aboutEdit error:", err);
  }
};

export async function AboutFasilitasGet() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/fasilitas`, { method: "GET", headers: { "Accept": "application/json" }});
  return res.json();
}

export async function AboutFasilitasGetid(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/fasilitas/${id}`, { method: "GET", headers: { "Accept": "application/json" }});
  return res.json();
}

export async function AboutFasilitasAdd(props: { name: string; picture: File }) {
  const formData = new FormData();
  formData.append("judul", props.name);
  formData.append("gambar", props.picture);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/fasilitas`, { method: "POST", body: formData });
  return { ok: res.ok, status: res.status, data: await res.json() };
}

export async function AboutFasilitasEdit(props: { id: number; judul: string; gambar?: File | null }) {
  const formData = new FormData();
  formData.append("judul", props.judul);
  if (props.gambar) formData.append("gambar", props.gambar);
  formData.append("_method", "PUT"); // Laravel butuh ini

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/fasilitas/${props.id}`, {
    method: "POST",
    body: formData,
    headers: { "Accept": "application/json" },
  });
  return res;
}

export async function AboutFasilitasDelete(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/fasilitas/${id}`, { method: "DELETE", headers: { "Accept": "application/json" }});
  return res.json();
}

export async function AboutExtraGet() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/ekstra`, { method: "GET", headers: { "Accept": "application/json" }});
  return res.json();
}

export async function AboutExtraAdd(name: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/ekstra`, {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ judul: name }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Server error:", text);
    throw new Error("Gagal menambahkan ekstrakurikuler");
  }
  return res.json();
}


export async function AboutExtraEdit(id: number, judul: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/ekstra/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ judul }),
  });
  return res.json();
}

export async function AboutExtraDelete(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/ekstra/${id}`, { method: "DELETE", headers: { "Accept": "application/json" }});
  return res.json();
}

export async function AboutprogramGet() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/programkerja`, { method: "GET", headers: { "Accept": "application/json" }});
  return res.json();
}

export async function AboutProgramAdd(name: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/programkerja`, {
    method: "POST",
    headers: { "Accept": "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ judul: name }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Server error:", text);
  }
  return res.json();
}

export async function AboutProgramEdit(id: number, judul: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/programkerja/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ judul }),
  });
  return res.json();
}

export async function AboutprogramDelete(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/programkerja/${id}`, { method: "DELETE", headers: { "Accept": "application/json" }});
  return res.json();
}
