import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

export default function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: fileName } = await axios.post("/upload-by-link", {
      link: photoLink,
    });

    onChange((prev) => {
      return [...prev, "uploads/" + fileName];
    });

    setPhotoLink("");
  }

  function uploadPhotos(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: fileName } = res;
        onChange((prev) => {
          return [...prev, ...fileName];
        });
      });
  }
  return (
    <>
      {" "}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          placeholder="add using a link ....jpg"
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 px-4 rounded-2xl"
        >
          Add&nbsp;photo
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((photo, index) => (
            <div key={index}>
              <img
                className="h-32 rounded-2xl w-full object-cover"
                src={"http://127.0.0.1:4000/" + photo}
              />
            </div>
          ))}

        <label className="flex h-32 cursor-pointer justify-center gap-1 border bg-transparent rounded-2xl items-center p-2 text-gray-600 text-2xl">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhotos}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}

PhotosUploader.propTypes = {
  addedPhotos: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
