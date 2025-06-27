import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../config';

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/album/list`);

      if (response.data.success) {
        setData(response.data.albums);
      }
    } catch (error) {
      toast.error('Error fetching albums: ' + error.message);
    }
  };

  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/album/remove`, { id });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums();
      } else {
        toast.error('Failed to delete album.');
      }
    } catch (error) {
      toast.error('Error deleting album: ' + error.message);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div>
      <p className="text-lg font-semibold mb-4">All Albums List</p>
      <div>
        {/* Table heading */}
        <div className="sm:grid hidden grid-cols-[0.5fr_1.5fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>

        {/* Album data rows */}
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] sm:grid-cols-[0.5fr_1.5fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
          >
            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
            <p>{item.name}</p>
            <p>{item.desc}</p>
            <input type='color' value={item.bgColour}></input>
            <button
              className="mx-auto block bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-4 rounded-lg transition duration-200 ease-in-out shadow-sm hover:shadow-md cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                removeAlbum(item._id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAlbum;
