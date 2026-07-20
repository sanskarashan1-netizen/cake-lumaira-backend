import * as HeroModel from '../models/heroSlideModel.js';

// GET all slides
export const getSlides = async (req, res) => {
  try {
    const slides = await HeroModel.getAllSlides();
    res.json(slides);
  } catch (error) {
    console.error('Error in getSlides controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST a new slide
export const createSlide = async (req, res) => {
  try {
    const slideData = req.body;
    const newSlide = await HeroModel.createSlide(slideData);
    res.status(201).json(newSlide);
  } catch (error) {
    console.error('Error in createSlide controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PATCH / PUT update a slide
export const updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updated = await HeroModel.updateSlide(id, updateData);
    if (!updated) {
      return res.status(404).json({ error: 'Slide not found' });
    }
    
    res.json(updated);
  } catch (error) {
    console.error('Error in updateSlide controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// DELETE a slide
export const deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await HeroModel.deleteSlide(id);
    if (!success) {
      return res.status(404).json({ error: 'Slide not found' });
    }
    res.json({ success: true, message: `Slide ${id} deleted successfully` });
  } catch (error) {
    console.error('Error in deleteSlide controller:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
