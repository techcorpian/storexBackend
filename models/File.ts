import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  folder_id: { type: String, required: true },
  blockstatus: { type: Number, default: 0},
  deletestatus: { type: Number, default: 0},
},
{
    timestamps: true, // Automatically adds createdAt and updatedAt fields
}
);

export const File = mongoose.model('File', fileSchema);