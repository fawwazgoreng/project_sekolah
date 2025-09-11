
export type DataAbout = {
  id: number;
  gambar: string;
  judul: string;
  deskripsi: string;
  created_at: string | null;
  updated_at: string | null;
};

export type DataAboutBerita = {
  id: number;
  gambar: string;
  judul: string;
  status: string;
  deskripsi: string;
  created_at: string | null;
  updated_at: string | null;
};

export type Admin = {
  id: number;
  username: string | null;
  password: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type VisiMisi = {
  id:number;
  visi:string;
  misi:string;
  moto:string;
    created_at: string | null;
  updated_at: string | null;
}