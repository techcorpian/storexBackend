import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  master_id: { type: String, required: true },
  blockstatus: { type: Number, default: 0},
  deletestatus: { type: Number, default: 0},
},
{
    timestamps: true, // Automatically adds createdAt and updatedAt fields
}
);

export const Folder = mongoose.model('Folder', folderSchema);