import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const TextExtractor = () => {
  const [text, setText] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractText = () => {
    if (imageSrc) {
      Tesseract.recognize(
        imageSrc,
        'eng',
      ).then(({ data: { text } }) => {
        setText(text);
      });
    } else {
      console.error('Please select an image first.');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={extractText}>Extract Text</button>
      {imageSrc && <img src={imageSrc} alt="Selected" style={{ maxWidth: '100%' }} />}
      {text && <div className=' font-serif'>{text}</div>}
    </div>
  );
};

export default TextExtractor;
