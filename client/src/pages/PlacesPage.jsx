import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckout] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function preInput(header, description) {
    return (
      <>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            to={"/account/places/new"}
            className="inline-flex bg-primary gap-1 text-white rounded-full py-2 px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}

      {action == "new" && (
        <div>
          <form>
            {preInput(
              "Title",
              "Title for your place. should be nice and catchy as in advertisement"
            )}
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="title,for example my lovely apt."
            />

            {preInput("Address", "Address for your place")}
            <input
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder="address"
            />

            {preInput("Photos", "more = better")}

            <PhotosUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />

            {preInput("Description", "Description of your place")}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />

            {preInput("Perks", "Select all the perks your place have")}

            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              <Perks selected={perks} onChange={setPerks} />
            </div>

            {preInput("Extra info", "house rules, etc")}

            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />

            {preInput(
              "Check in&out times, max guest",
              "add check in and out times, remember to have some window for cleaning the room between guests."
            )}

            <div className="grid sm:grid-cols-3 gap-2">
              <div>
                <h1>Check in time</h1>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  placeholder="16:00"
                />
              </div>
              <div>
                <h2>Check out time</h2>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(ev) => setCheckout(ev.target.value)}
                  placeholder="12:00"
                />
              </div>
              <div>
                <h2>Maximum number of guests</h2>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                  placeholder="1"
                />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
