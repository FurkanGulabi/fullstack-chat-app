import React, { useState } from "react";
import { message as messagee, Button, Input, Upload } from 'antd';
import { BsSend, BsUpload } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage.js";
import { getBase64 } from "../../utils/getBase64";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null); // State to hold the selected file
  const [previewImage, setPreviewImage] = useState(''); // State to hold the preview image
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !file) return; // Don't send if both message and file are empty
    if (message && message.length > 1024) return messagee.error("Mesajınız çok uzun");
    if (message && message.trim() === "") return messagee.error("Boş bir mesaj gönderemezsiniz");

    const trimmedMessage = message.trim();

    await sendMessage(trimmedMessage, file); // Pass message and file
    setMessage("");
    setPreviewImage(''); // Reset preview image after sending
  };

  const handleFileChange = async (file) => {

    const base64Image = await getBase64(file);
    setPreviewImage(base64Image);
    setFile(file)
  };

  return (
    <>

      <form className="flex items-center gap-2 px-4 my-3" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Mesaj gönderin..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Upload
          accept=".png, .jpg, .jpeg, .gif"
          showUploadList={false}
          beforeUpload={(file) => {
            handleFileChange(file);
            return false;
          }}
          maxCount={1}
          multiple={false}
        >
          <Button icon={<BsUpload />} />
        </Upload>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          icon={<BsSend />}
        />
      </form>
      {previewImage && (
        <div style={{ maxWidth: "100%", maxHeight: 100, overflow: "hidden" }}>
          <img
            src={previewImage}
            alt="Preview"
            style={{ width: "auto", height: "100%" }}
            onClick={() => {
              setPreviewImage(null);
              setFile(null);
            }}
          />
        </div>
      )}
    </>
  );
};

export default MessageInput;
