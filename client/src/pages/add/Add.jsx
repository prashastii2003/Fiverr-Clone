import React, { useReducer, useState } from "react";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducers";
import upload from '../../utils/upload.js';
import { useQueryClient, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setsingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handlechange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value }
    });
  };

  const handlefeature = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_FEATURE", payload: e.target[0].value });
    e.target[0].value = "";
  };

  const handleupload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => await upload(file))
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => newRequest.post("/gigs", gig),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate('/mygigs');
  };

  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Add New Gig
        </h1>

        <form onSubmit={handlesubmit} className="grid md:grid-cols-2 gap-10 bg-white p-8 rounded-lg shadow-lg">
          {/* LEFT SECTION */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1">Title</label>
              <input
                type="text"
                name="title"
                placeholder="e.g. I will do something I'm really good at"
                onChange={handlechange}
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Category</label>
              <select
                name="cat"
                onChange={handlechange}
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Design">Design</option>
                <option value="Web developer">Web Developer</option>
                <option value="Animation">Animation</option>
                <option value="Music">Music</option>
              </select>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setsingleFile(e.target.files[0])}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <button
                type="button"
                onClick={handleupload}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-1">Description</label>
              <textarea
                name="desc"
                rows="6"
                placeholder="A brief description to introduce your service to customers"
                onChange={handlechange}
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition"
            >
              Create
            </button>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold mb-1">Service Title</label>
              <input
                type="text"
                name="sortTitle"
                placeholder="e.g. One-page web design"
                onChange={handlechange}
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Short Description</label>
              <textarea
                name="sortDesc"
                rows="4"
                placeholder="Short description of your service"
                onChange={handlechange}
                className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Delivery Time (days)</label>
              <input
                type="number"
                name="deliveryTime"
                min={2}
                onChange={handlechange}
                className="w-full border rounded-md px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Revision Number</label>
              <input
                type="number"
                min={1}
                name="revisonNumber"
                onChange={handlechange}
                className="w-full border rounded-md px-4 py-2"
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-semibold mb-1">Add Features</label>
              <form onSubmit={handlefeature} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. page design"
                  className="flex-1 border rounded-md px-4 py-2"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </form>
            </div>

            {/* Added Features List */}
            <div className="flex flex-wrap gap-2">
              {state?.features?.map((f) => (
                <div
                  key={f}
                  className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                >
                  {f}
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                onChange={handlechange}
                className="w-full border rounded-md px-4 py-2"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
