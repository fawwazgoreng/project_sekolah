export async function SejarahGet() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/sejarah`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
}

export const SejarahEdit = async ({
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/sejarah/${id}`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("SejarahEdit failed:", text);
      return { status: false, message: "Failed to update", raw: text };
    }

    return await res.json();
  } catch (err) {
    console.error("SejarahEdit error:", err);
    return { status: false, message: "Request error", raw: err };
  }
};


