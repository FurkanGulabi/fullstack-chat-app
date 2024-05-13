import React, { useEffect, useState } from "react";
import { message as showMessage, Button, Input, Upload } from 'antd';
import { BsSend, BsUpload } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage.js";
import { getBase64 } from "../../utils/getBase64";
import { RiImageAddLine, RiCloseCircleLine } from 'react-icons/ri';

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const { loading, sendMessage } = useSendMessage();

  useEffect(() => {
    console.log(file);


  }, [file])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !file) return;

    if (message && message.length > 1024) {
      showMessage.error("Mesajınız çok uzun");
      return;
    }

    if (message && message.trim() === "") {
      showMessage.error("Boş bir mesaj gönderemezsiniz");
      return;
    }

    const trimmedMessage = message.trim();

    await sendMessage(trimmedMessage, file);
    setMessage("");
    setFile(null);
    setPreviewImage("");
  };

  const handleFileChange = async (file) => {
    const base64Image = await getBase64(file);
    setPreviewImage(base64Image);
    setFile(file);
  };

  const handleMessageChange = (e) => {
    const msg = e.target.value;
    if (msg.length <= 1024) {
      setMessage(msg);
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      if (selectedImage.size <= 10485760) {
        handleFileChange(selectedImage);
      } else {
        showMessage.error("Dosya boyutu çok büyük. Lütfen daha küçük bir dosya seçin.");
      }
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreviewImage(null);
  };

  return (
    <>
      {previewImage && (
        <div className="flex relative">
          <img src={previewImage} alt="Preview" className="w-24 h-24 object-cover rounded-lg"></img>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="top-0 -left-9 flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-md"
            disabled={loading}
          >
            <RiCloseCircleLine className="w-4 h-4 text-red-500" />
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-row gap-4">
        <input
          value={message}
          onChange={handleMessageChange}
          maxLength={1024}
          placeholder="Mesajınızı yazın..."
          className="w-full p-4 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="file-upload" className="flex items-center gap-2 cursor-pointer">
            <RiImageAddLine className="w-6 h-6 text-blue-500" />
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"

            />
          </label>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none"
            disabled={loading}
          >
            Gönder
          </button>
        </div>
      </form>
    </>
  );
};

export default MessageInput;
