import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { getErrorMessage } from '../utlis/commonHandler';

// Create a project
export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

// Get all projects
export const getProject = async (_req: Request, res: Response): Promise<void> => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // Extract the order ID from the route parameters

        if (!id) {
            res.status(400).json({ error: 'Project ID is required' });
            return;
        }

        // Fetch the order from the database
        const project = await Project.find({ _id: id }); // Adjust if you're using a different database or ORM

        if (!project) {
            res.status(404).json({ error: 'Folder not found' });
            return;
        }

        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ error: getErrorMessage(error) });
    }
};