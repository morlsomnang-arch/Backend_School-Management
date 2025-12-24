import { db } from "../config/db.js";
import fs from "fs";
import path from "path";

// Create Student
export const createStudent = async (req, res) => {
  try {
    const { name, age, phone } = req.body;
    const image = req.file?.filename ?? null;

    await db.query(
      "INSERT INTO students (name, age, phone, image) VALUES (?, ?, ?, ?)",
      [name, age, phone, image]
    );

    res.json({ message: "Student created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get Students
export const getStudents = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM students ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, phone } = req.body;

    // Get old student to remove old image if new uploaded
    const [rows] = await db.query("SELECT * FROM students WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Student not found" });

    const oldImage = rows[0].image;

    const image = req.file?.filename ?? oldImage;

    await db.query(
      "UPDATE students SET name = ?, age = ?, phone = ?, image = ? WHERE id = ?",
      [name, age, phone, image, id]
    );

    // Delete old image file if replaced
    if (req.file && oldImage) {
      const oldPath = path.join("uploads", oldImage);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    res.json({ message: "Student updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM students WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ message: "Student not found" });

    const image = rows[0].image;

    await db.query("DELETE FROM students WHERE id = ?", [id]);

    // Delete image file
    if (image) {
      const imagePath = path.join("uploads", image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    res.json({ message: "Student deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
