import {DataAboutBerita } from "../types/types";

export async function BeritaGet() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/berita`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
}

export async function BeritaGetId(id: number) :Promise<{data : DataAboutBerita}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/berita/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
}

export async function BeritaAdd(formData : FormData) {
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

export async function BeritaUpdate(id: number | null, formData: FormData) {
  if (id === null) return { status: false, message: "ID is null" };

  formData.append("_method", "PUT");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/berita/${id}`, {
      method: "POST", // POST with _method=PUT
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        status: false,
        message: errorData.message || "Server validation error",
        errors: errorData.errors || {},
      };
    }

    const data = await res.json();
    return { status: true, data };
  } catch (err) {   
    console.error("Failed to update berita:", err);
    return { status: false, message: "Update error" };
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
