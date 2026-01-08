import { Student } from "../../model/Element/Student.js";

import fs from "fs";
import path from "path";

// Load JSON files for addresses if needed
const loadJSON = (file) => {
  const data = fs.readFileSync(path.join(process.cwd(), `address/${file}`), "utf-8");
  return JSON.parse(data);
};

const provinces = loadJSON("provinces.json");
const districts = loadJSON("districts.json");
const communes = loadJSON("communes.json");
const villages = loadJSON("villages.json");

// GET all students
export const index = async (req, res) => {
  try {
    const students = await Student.findAll({ order: [["id", "DESC"]] });

    // Add full URL for image
    const studentsWithImageUrl = students.map((student) => ({
      ...student.toJSON(),
      image: student.image
        ? `${req.protocol}://${req.get("host")}/api/uploads/${student.image}`
        : null,
    }));

    res.json(studentsWithImageUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE a new student
export const create = async (req, res) => {
  try {
    const { name_kh, name_en, dob, phone, gender } = req.body;
    const image = req.file ? req.file.filename : null;

    const student = await Student.create({
      name_kh,
      name_en,
      dob,
      phone,
      gender,
      image,
    });

    res.status(201).json({ message: "Student created successfully", student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE a student
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_kh, name_en, dob, phone, gender } = req.body;
    const image = req.file ? req.file.filename : null;

    const student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Update fields
    student.name_kh = name_kh;
    student.name_en = name_en;
    student.dob = dob;
    student.phone = phone;
    student.gender = gender;
    if (image) student.image = image;

    await student.save();

    res.json({ message: "Student updated successfully", student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE a student
export const destroy = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByPk(id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    await student.destroy();
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
