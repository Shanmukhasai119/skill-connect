
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [form, setForm] = useState({
    name: "",
    skill: "",
    category: "Technical",
    description: "",
    email: ""
  });

  // Get skills from backend
  const getSkills = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/skills");
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.log("Backend connection failed");
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  // Handle form inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Add new skill
  const addSkill = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/skills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      if (!response.ok) {
        alert("Unable to add skill");
        return;
      }

      alert("Skill added successfully!");

      setForm({
        name: "",
        skill: "",
        category: "Technical",
        description: "",
        email: ""
      });

      getSkills();
    } catch (error) {
      alert("Please start the backend server first");
    }
  };

  // Connect with student
  const connectStudent = async (student) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/connect",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            studentName: student.name,
            studentEmail: student.email,
            skill: student.skill
          })
        }
      );

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Connection failed");
    }
  };

  // Search and filter
  const filteredSkills = skills.filter((item) => {
    const matchesSearch =
      item.skill.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <h2>Skill<span>Connect</span></h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#explore">Explore Skills</a>
          <a href="#share">Share Skills</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div>
          <h1>
            Connect Skills.<br />
            Build Your Future.
          </h1>

          <p>
            Share your knowledge, learn new skills,
            and collaborate with talented students.
          </p>

          <a href="#explore" className="hero-btn">
            Explore Skills
          </a>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats">
        <div>
          <h2>{skills.length}</h2>
          <p>Shared Skills</p>
        </div>

        <div>
          <h2>24/7</h2>
          <p>Learning Platform</p>
        </div>

        <div>
          <h2>∞</h2>
          <p>Opportunities</p>
        </div>
      </section>

      {/* Explore Section */}
      <section className="section" id="explore">
        <h2>Explore Student Skills</h2>
        <p>Find students with the skills you need.</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search skills or student name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Technical">Technical</option>
            <option value="Non-Technical">Non-Technical</option>
          </select>
        </div>

        <div className="skill-container">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((item) => (
              <div className="skill-card" key={item.id}>
                <span className="category">
                  {item.category}
                </span>

                <h3>{item.skill}</h3>

                <p>{item.description}</p>

                <div className="student-info">
                  <strong>{item.name}</strong>
                  <small>{item.email}</small>
                </div>

                <button
                  onClick={() => connectStudent(item)}
                >
                  Connect
                </button>
              </div>
            ))
          ) : (
            <p className="empty">
              No skills found. Be the first to share!
            </p>
          )}
        </div>
      </section>

      {/* Share Skills Section */}
      <section className="section share-section" id="share">
        <h2>Share Your Skills</h2>
        <p>Help other students learn from you.</p>

        <form className="skill-form" onSubmit={addSkill}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="skill"
            placeholder="Enter Your Skill"
            value={form.skill}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="Technical">Technical</option>
            <option value="Non-Technical">Non-Technical</option>
          </select>

          <textarea
            name="description"
            placeholder="Describe your skill..."
            value={form.description}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Share Skill
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer>
        <h2>SkillConnect</h2>
        <p>Learn Together. Grow Together. Build Together.</p>
        <p>© 2026 Skill Connect. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default App;
