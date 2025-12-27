import { db } from "../config/db.js";

export const index = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM students");
  res.json(rows);
};

export const create = async (req, res) => {
  const { name, age, phone } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    await db.query(
      'INSERT INTO students (name, age, phone, image) VALUES (?, ?, ?, ?)',
      [name, age, phone, image]
    );
    res.json({ message: 'Student created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const update = async (req, res) => {
  const { id } = req.params;
  const { name, age, phone } = req.body;
  await db.query(
    "UPDATE students SET name=?, age=?, phone=? WHERE id=?",
    [name, age, phone, id]
  );
  res.json({ message: "Student updated" });
};

export const destroy = async (req, res) => {
  await db.query("DELETE FROM students WHERE id=?", [req.params.id]);
  res.json({ message: "Student deleted" });
};
