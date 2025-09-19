// src/app/api/visimisi.ts

export async function VisimisiGet() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/visimisi`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("VisimisiGet error:", err);
    return { status: false, data: null, message: "Failed to fetch Visi Misi" };
  }
}

export async function VisimisiEdit(payload: {
  id: number;
  visi: string;
  misi: string;
  moto: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/visimisi/${payload.id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  ).then((res) => res.json());
  return response;
}

export async function VisimisiAdd(payload: {
  visi: string;
  misi: string;
  moto: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASEURL}/visimisi`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  ).then((res) => res.json());
  return response;
}
