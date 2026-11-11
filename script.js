/* ==================================================
   SKILL CONNECT
   JavaScript File
================================================== */


/* ==================================================
   SAMPLE STUDENTS
================================================== */

let students = JSON.parse(localStorage.getItem("students")) || [

    {
        id: 1,

        name: "Rahul Kumar",

        email: "rahul@example.com",

        college: "ABC Engineering College",

        course: "B.Tech CSE",

        skills: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        about:
            "Frontend developer interested in building responsive websites."
    },


    {
        id: 2,

        name: "Priya Sharma",

        email: "priya@example.com",

        college: "XYZ University",

        course: "B.Tech AI",

        skills: [
            "Python",
            "Machine Learning",
            "TensorFlow"
        ],

        about:
            "AI enthusiast interested in machine learning projects."
    },


    {
        id: 3,

        name: "Arjun Reddy",

        email: "arjun@example.com",

        college: "ABC Institute of Technology",

        course: "B.Tech CSE",

        skills: [
            "Java",
            "SQL",
            "Spring Boot"
        ],

        about:
            "Backend developer interested in building scalable applications."
    },


    {
        id: 4,

        name: "Sneha Rao",

        email: "sneha@example.com",

        college: "Tech University",

        course: "B.Tech IT",

        skills: [
            "UI/UX",
            "Figma",
            "Graphic Design"
        ],

        about:
            "UI/UX designer who enjoys creating simple user-friendly designs."
    }

];


/* ==================================================
   SAMPLE PROJECTS
================================================== */

let projects = JSON.parse(localStorage.getItem("projects")) || [

    {
        id: 1,

        name: "E-Commerce Website",

        description:
            "Build a responsive online shopping website with product search and cart functionality.",

        skills: [
            "HTML",
            "CSS",
            "JavaScript"
        ],

        type: "Academic",

        members: 2
    },


    {
        id: 2,

        name: "AI Chatbot",

        description:
            "Develop an AI-based chatbot that can answer student questions.",

        skills: [
            "Python",
            "Machine Learning"
        ],

        type: "Personal",

        members: 3
    },


    {
        id: 3,

        name: "Campus Event App",

        description:
            "Create an application for managing college events and student registrations.",

        skills: [
            "React",
            "JavaScript",
            "Firebase"
        ],

        type: "Hackathon",

        members: 4
    }

];


/* ==================================================
   INITIALIZE APPLICATION
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    displayStudents(students);

    displayProjects(projects);

    updateDashboard();

});


/* ==================================================
   DISPLAY STUDENTS
================================================== */

function displayStudents(studentArray) {

    const studentList =
        document.getElementById("studentList");

    studentList.innerHTML = "";


    if (studentArray.length === 0) {

        studentList.innerHTML = `
            <div class="no-results">
                <h3>No students found</h3>
                <p>Try searching for another skill.</p>
            </div>
        `;

        return;
    }


    studentArray.forEach(function (student) {

        const firstLetter =
            student.name.charAt(0).toUpperCase();


        const skillHTML =
            student.skills
            .map(function (skill) {

                return `
                    <span class="skill">
                        ${skill}
                    </span>
                `;

            })
            .join("");


        const card = document.createElement("div");

        card.className = "student-card";


        card.innerHTML = `

            <div class="avatar">
                ${firstLetter}
            </div>

            <h3>
                ${student.name}
            </h3>

            <p>
                🎓 ${student.course}
            </p>

            <p>
                🏫 ${student.college}
            </p>

            <div class="skills">
                ${skillHTML}
            </div>

            <button
                class="view-btn"
                onclick="viewStudent(${student.id})">

                View Profile

            </button>

        `;


        studentList.appendChild(card);

    });

}


/* ==================================================
   SEARCH STUDENTS
================================================== */

function searchStudents() {

    const searchValue =
        document
        .getElementById("skillSearch")
        .value
        .toLowerCase()
        .trim();


    if (searchValue === "") {

        displayStudents(students);

        return;
    }


    const filteredStudents =
        students.filter(function (student) {

            const skillMatch =
                student.skills.some(function (skill) {

                    return skill
                        .toLowerCase()
                        .includes(searchValue);

                });


            const nameMatch =
                student.name
                    .toLowerCase()
                    .includes(searchValue);


            const courseMatch =
                student.course
                    .toLowerCase()
                    .includes(searchValue);


            return skillMatch ||
                   nameMatch ||
                   courseMatch;

        });


    displayStudents(filteredStudents);
}


/* ==================================================
   VIEW STUDENT
================================================== */

function viewStudent(id) {

    const student =
        students.find(function (student) {

            return student.id === id;

        });


    if (!student) {
        return;
    }


    const firstLetter =
        student.name.charAt(0).toUpperCase();


    const skillsHTML =
        student.skills
        .map(function (skill) {

            return `
                <span class="skill">
                    ${skill}
                </span>
            `;

        })
        .join("");


    document.getElementById("studentDetails").innerHTML = `

        <div class="detail-avatar">
            ${firstLetter}
        </div>

        <h2>
            ${student.name}
        </h2>

        <p>
            <strong>Email:</strong>
            ${student.email}
        </p>

        <p>
            <strong>College:</strong>
            ${student.college}
        </p>

        <p>
            <strong>Course:</strong>
            ${student.course}
        </p>

        <p>
            <strong>About:</strong>
            ${student.about || "No information provided."}
        </p>

        <h3 style="margin-top:20px;">
            Skills
        </h3>

        <div class="skills">
            ${skillsHTML}
        </div>

        <button
            class="join-btn"
            onclick="connectStudent('${student.name}')">

            Connect with ${student.name}

        </button>

    `;


    document.getElementById("studentModal")
        .style.display = "block";
}


/* ==================================================
   CONNECT STUDENT
================================================== */

function connectStudent(name) {

    let connections =
        Number(localStorage.getItem("connections")) || 0;


    connections++;


    localStorage.setItem(
        "connections",
        connections
    );


    alert(
        `Connection request sent to ${name}!`
    );


    updateDashboard();

    closeStudentModal();
}


/* ==================================================
   CLOSE STUDENT MODAL
================================================== */

function closeStudentModal() {

    document.getElementById("studentModal")
        .style.display = "none";
}


/* ==================================================
   OPEN PROFILE FORM
================================================== */

function openProfileForm() {

    document.getElementById("profile")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ==================================================
   CREATE PROFILE
================================================== */

document.getElementById("profileForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();


        const email =
            document.getElementById("email").value.trim();


        const college =
            document.getElementById("college").value.trim();


        const course =
            document.getElementById("course").value.trim();


        const skillsText =
            document.getElementById("skillsInput").value;


        const about =
            document.getElementById("about").value.trim();


        const skills =
            skillsText
            .split(",")
            .map(function (skill) {

                return skill.trim();

            })
            .filter(function (skill) {

                return skill !== "";

            });


        const newStudent = {

            id: Date.now(),

            name: name,

            email: email,

            college: college,

            course: course,

            skills: skills,

            about: about

        };


        students.push(newStudent);


        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );


        alert(
            "Profile created successfully!"
        );


        this.reset();


        displayStudents(students);

        updateDashboard();


        document.getElementById("skills")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


/* ==================================================
   OPEN PROJECT FORM
================================================== */

function openProjectForm() {

    document.getElementById("projectModal")
        .style.display = "block";

}


/* ==================================================
   CLOSE PROJECT FORM
================================================== */

function closeProjectForm() {

    document.getElementById("projectModal")
        .style.display = "none";

}


/* ==================================================
   CREATE PROJECT
================================================== */

document.getElementById("projectForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const projectName =
            document
            .getElementById("projectName")
            .value
            .trim();


        const description =
            document
            .getElementById("projectDescription")
            .value
            .trim();


        const requiredSkillsText =
            document
            .getElementById("requiredSkills")
            .value;


        const type =
            document
            .getElementById("projectType")
            .value;


        const requiredSkills =
            requiredSkillsText
            .split(",")
            .map(function (skill) {

                return skill.trim();

            })
            .filter(function (skill) {

                return skill !== "";

            });


        const newProject = {

            id: Date.now(),

            name: projectName,

            description: description,

            skills: requiredSkills,

            type: type,

            members: 1

        };


        projects.push(newProject);


        localStorage.setItem(
            "projects",
            JSON.stringify(projects)
        );


        alert(
            "Project created successfully!"
        );


        this.reset();

        closeProjectForm();

        displayProjects(projects);

        updateDashboard();

    });


/* ==================================================
   DISPLAY PROJECTS
================================================== */

function displayProjects(projectArray) {

    const projectList =
        document.getElementById("projectList");


    projectList.innerHTML = "";


    projectArray.forEach(function (project) {

        const skillsHTML =
            project.skills
            .map(function (skill) {

                return `
                    <span class="skill">
                        ${skill}
                    </span>
                `;

            })
            .join("");


        const card =
            document.createElement("div");


        card.className =
            "project-card";


        card.innerHTML = `

            <h3>
                ${project.name}
            </h3>

            <p>
                ${project.description}
            </p>

            <span class="project-type">
                ${project.type}
            </span>

            <div class="skills">
                ${skillsHTML}
            </div>

            <p>
                👥 ${project.members}
                team member(s)
            </p>

            <br>

            <button
                class="join-btn"
                onclick="joinProject(${project.id})">

                Join Project

            </button>

        `;


        projectList.appendChild(card);

    });

}


/* ==================================================
   JOIN PROJECT
================================================== */

function joinProject(projectId) {

    const project =
        projects.find(function (project) {

            return project.id === projectId;

        });


    if (!project) {
        return;
    }


    project.members++;


    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );


    alert(
        `You joined "${project.name}" successfully!`
    );


    displayProjects(projects);

}


/* ==================================================
   DASHBOARD
================================================== */

function updateDashboard() {

    document.getElementById("studentCount")
        .textContent = students.length;


    const allSkills = [];


    students.forEach(function (student) {

        student.skills.forEach(function (skill) {

            allSkills.push(
                skill.toLowerCase()
            );

        });

    });


    const uniqueSkills =
        [...new Set(allSkills)];


    document.getElementById("skillCount")
        .textContent =
        uniqueSkills.length;


    document.getElementById("projectCount")
        .textContent =
        projects.length;


    const connections =
        Number(
            localStorage.getItem("connections")
        ) || 0;


    document.getElementById("connectionCount")
        .textContent =
        connections;

}


/* ==================================================
   SCROLL TO SKILLS
================================================== */

function scrollToSkills() {

    document.getElementById("skills")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ==================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
================================================== */

window.onclick = function (event) {

    const projectModal =
        document.getElementById("projectModal");

    const studentModal =
        document.getElementById("studentModal");


    if (event.target === projectModal) {

        projectModal.style.display = "none";

    }


    if (event.target === studentModal) {

        studentModal.style.display = "none";

    }

};
