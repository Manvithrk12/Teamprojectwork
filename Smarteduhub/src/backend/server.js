import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Define Schemas
const principalSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
});

const studentSchema = new mongoose.Schema({
    name: String,
    registerNumber: String,
    email: String,
    password: String,
    class: String,
    phone: String,
});

const teacherSchema = new mongoose.Schema({
    name: String,
    email: String,
    class: String,
    phone: String,
    subject: String,
    password: String,
});

const Principal = mongoose.model("Principal", principalSchema);
const Student = mongoose.model("Student", studentSchema);
const Teacher = mongoose.model("Teacher", teacherSchema);

// CRUD Routes for Principal
app.post("/api/principals", async (req, res) => {
    try {
        const newPrincipal = new Principal(req.body);
        await newPrincipal.save();
        res.status(201).json(newPrincipal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/principals", async (req, res) => {
    try {
        const principals = await Principal.find();
        res.json(principals);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/api/principals/:id", async (req, res) => {
    try {
        const updatedPrincipal = await Principal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPrincipal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/api/principals/:id", async (req, res) => {
    try {
        await Principal.findByIdAndDelete(req.params.id);
        res.json({ message: "Principal deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CRUD Routes for Students
app.post("/api/students", async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/api/students/:id", async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/api/students/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CRUD Routes for Teachers
app.post("/api/teachers", async (req, res) => {
    try {
        const newTeacher = new Teacher(req.body);
        await newTeacher.save();
        res.status(201).json(newTeacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/teachers", async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/api/teachers/:id", async (req, res) => {
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/api/teachers/:id", async (req, res) => {
    try {
        await Teacher.findByIdAndDelete(req.params.id);
        res.json({ message: "Teacher deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

