import * as cakeModel from '../models/cakeModel.js';

export const getCakes = async (req, res) => {
  try {
    const cakes = await cakeModel.getAllCakes();
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cakes" });
  }
};

export const createCake = async (req, res) => {
  try {
    const newCake = await cakeModel.createCake(req.body);
    res.status(201).json(newCake);
  } catch (error) {
    res.status(400).json({ error: "Failed to create cake" });
  }
};

export const updateCake = async (req, res) => {
  try {
    const updated = await cakeModel.updateCake(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Cake not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Failed to update cake" });
  }
};

export const deleteCake = async (req, res) => {
  try {
    const success = await cakeModel.deleteCake(req.params.id);
    if (!success) {
      return res.status(404).json({ error: "Cake not found" });
    }
    res.json({ message: "Cake deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete cake" });
  }
};
