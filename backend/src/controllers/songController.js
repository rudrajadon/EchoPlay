import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/songModel.js';
import { parseFile } from 'music-metadata';

const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    // Upload files to Cloudinary
    const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

    // Get audio duration using music-metadata
    const metadata = await parseFile(audioFile.path);
    const totalSeconds = Math.floor(metadata.format.duration);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const duration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Prepare song data
    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration
    };

    const song = songModel(songData);
    await song.save();

    res.json({ success: true, message: "Song added successfully", song: songData });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error adding song", error: error.message });
  }
};

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({});
        res.json({success: true, songs: allSongs});

    } catch (error) {
        res.json({success: false, message: "Error fetching songs", error: error.message});

    }
}

const removeSong = async (req, res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Song removed successfully"});

    } catch (error) {
        res.json({success: false, message: "Error removing song", error: error.message});
    }
}

export {addSong, listSong, removeSong};