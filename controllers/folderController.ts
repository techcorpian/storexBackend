import { Request, Response } from 'express';
import { Folder } from '../models/Folder';
import { File } from '../models/File';

// Helper function to extract error messages safely
const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};

// Create a folder
export const createFolder = async (req: Request, res: Response): Promise<void> => {
    try {
        const folder = new Folder(req.body);
        await folder.save();
        res.status(201).json(folder);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

// Get all folders
export const getFolders = async (_req: Request, res: Response): Promise<void> => {
    try {
        const folders = await Folder.find();
        res.status(200).json(folders);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const getFolderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // Extract the order ID from the route parameters

        if (!id) {
            res.status(400).json({ error: 'Folder ID is required' });
            return;
        }

        // Fetch the order from the database
        const folder = await Folder.find({ master_id: id }); // Adjust if you're using a different database or ORM

        if (!folder) {
            res.status(404).json({ error: 'Folder not found' });
            return;
        }

        res.status(200).json({ folder });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const getBreadcrumbsById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // Extract the order ID from the route parameters

        if (!id) {
            res.status(400).json({ error: 'Folder ID is required' });
            return;
        }

        // Fetch the order from the database
        const breadcrumbs = await Folder.findById(id); // Adjust if you're using a different database or ORM

        if (!breadcrumbs) {
            res.status(404).json({ error: 'Folder not found' });
            return;
        }

        res.status(200).json({ breadcrumbs });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const deleteBulk = async (req: Request, res: Response): Promise<void> => {
    try {
        const { items } = req.body; // Array of item IDs
        await Folder.deleteMany({ _id: { $in: items } });
        await File.deleteMany({ _id: { $in: items } });
        res.status(200).json({ message: 'Items deleted successfully.' });
      } catch (error) {
        res.status(500).json({ error: 'Error deleting items.' });
      }
}