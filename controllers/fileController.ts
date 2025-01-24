import { Request, Response } from 'express';
import { File } from '../models/File';

// Helper function to extract error messages safely
const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};

// Create a file
export const createFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const file = new File(req.body);
        await file.save();
        res.status(201).json(file);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

// Get all files
export const getFiles = async (_req: Request, res: Response): Promise<void> => {
    try {
        const files = await File.find();
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const getFileById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // Extract the order ID from the route parameters

        if (!id) {
            res.status(400).json({ error: 'Folder ID is required' });
            return;
        }

        // Fetch the order from the database
        const file = await File.find({ folder_id: id }); // Adjust if you're using a different database or ORM

        if (!file) {
            res.status(404).json({ error: 'File not found' });
            return;
        }

        res.status(200).json({ file });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};