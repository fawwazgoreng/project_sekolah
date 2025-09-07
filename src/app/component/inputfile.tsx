'use client';

import React, { useRef } from 'react';

export const UploadPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // trigger file input
  };
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/slide`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        alert('File berhasil diupload!');
        window.location.reload();
      } else {
        alert('Upload gagal.');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat upload.');
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick} className="px-4 py-2 bg-blue-600 text-white rounded">
        Tambah
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className=' hidden'
        onChange={handleFileChange}
      />
    </div>
  );
}
