"use client";
import React, { useState } from "react";
import axios from "axios";
import Dialouge from "../Dialouge/Dialouge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

const Uploadbox: React.FC = () => {
  // Using React useState to change state of components
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>("Upload a .xlsx or .xls file");
  const [isUploaded, setIsUploaded] = useState<boolean>(false); // Controls dialog visibility

  // function to handle file upload 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      const fileName = event.target.files[0].name;
      setText(fileName);
    }
  };
  // function to handle input submit action
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // To check if the file is selected
    if (!file) {
      setText("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/uploadFile", // backend route to upload the file using post method
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setText(response.data.message || "File uploaded successfully!");
      setIsUploaded(true);
    } catch (error: any) {
      console.error(error);
      setText("Error uploading file.");
    }
  };

  return (
    <>
      <div className="p-10">
        <h3>Add Candidates to Database</h3>
        {isUploaded ? (
          <Dialouge />  //Dialog box to show after successful upload
        ) : (
          // Form element to get user input file
          <form
            onSubmit={handleSubmit}
            className="border border-dashed border-black flex-col text-center py-10 my-5"
          >
            <label htmlFor="uploadImg" className="cursor-pointer">
              <FontAwesomeIcon
                icon={faCircleArrowUp}
                className="text-3xl m-3"
              />
            </label>
            <input
              type="file"
              accept=".xlsx, .xls"
              id="uploadImg"
              onChange={handleFileChange}
              className="hidden visible-none"
            />
            <br />
            <p>{text}</p>
            <br />
            <button
              type="submit"
              className="border py-2 px-5 rounded-md bg-green-500 text-white"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Uploadbox;
