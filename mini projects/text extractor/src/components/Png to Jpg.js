import React from 'react';
import Swal from 'sweetalert2';

function PngToJpg() {
  const handleImageConversion = () => {
    const inputElement = document.getElementById('input');

    if (!inputElement.files[0]) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Select an Image first!',
        confirmButtonColor: 'crimson',
      });
      return;
    }

    const inputFile = inputElement.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const image = new Image();
      image.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const link = document.createElement('a');
        link.download = 'image.jpg';
        link.href = canvas.toDataURL('image/jpeg');
        link.click();
      };
      image.src = event.target.result;
    };

    reader.readAsDataURL(inputFile);
  };

  return (
    <div className=' flex justify-center items-center h-screen flex-col space-y-3'>
      <h1>Convert Image from Png to Jpg</h1>

      <input type="file" id="input" accept="image/png" />
      <button className=' px-2 py-1 bg-[#e03a3a] rounded-sm' onClick={handleImageConversion}>Convert Image</button>
    </div>
  );
}

export default PngToJpg;
