import React, { useState } from "react";
import axios from "axios";

const UploadImages = () => {
    const [files, setFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState("");

    // Handle file selection
    const handleFileChange = (event) => {
        setFiles(event.target.files); // Store multiple files
    };

    // Handle file upload
    const handleUpload = async () => {
        if (files.length === 0) {
            setUploadStatus("Please select files to upload.");
            return;
        }

        const formData = new FormData();
        for (const file of files) {
            formData.append("images", file); // Key must match backend field name
        }

        try {
            setUploadStatus("Uploading...");
            const response = await fetch("http://localhost:7000/uploadImages", {
                method: "POST",
                credentials: "include", 
                headers: {
                    // No need to set "Content-Type" when sending FormData; fetch sets it automatically.
                },
                body: formData, 
            });
            const data = await response.json();
            setUploadStatus("Upload successful");
        } catch (error) {
            console.error("Error uploading files:", error);
            setUploadStatus("Error uploading files. Please try again.");
        }
    };

    return (
        <div>
            <h1>Upload Images</h1>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default UploadImages;
