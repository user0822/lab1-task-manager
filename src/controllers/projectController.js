import prisma from '../utils/prisma.js';
import { validationResult } from 'express-validator';


export const getProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: { tasks: true } 
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createProject = async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, ownerId } = req.body;
    
    
    let user = await prisma.user.findFirst({ where: { id: Number(ownerId) } });
    
    if (!user) {
        
        return res.status(404).json({ message: "User not found. Please create a user first." });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        ownerId: Number(ownerId)
      }
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
