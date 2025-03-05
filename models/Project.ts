import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  blockstatus: { type: Number, default: 0},
  deletestatus: { type: Number, default: 0},
},
{
    timestamps: true, // Automatically adds createdAt and updatedAt fields
}
);

export const Project = mongoose.model('Project', projectSchema);