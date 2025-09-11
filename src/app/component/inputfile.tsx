'use client';

import React, { useRef } from 'react';
import { SlideAdd } from '../api/slide';

export const UploadPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('gambar', file);

    try {
      const res = await SlideAdd(formData);

      if (res.status) { // <-- pakai status dari backend (true/false)
        alert('File berhasil diupload!');
        window.location.reload();
      } else {
        alert(res.message || 'Upload gagal.');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat upload.');
    }
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Tambah
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
