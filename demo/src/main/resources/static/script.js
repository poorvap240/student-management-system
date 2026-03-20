const apiUrl = "http://localhost:8084/students";
console.log("script loaded");
async function loadStudents() {
  try {
    console.log("loadedStudents called");
    const response = await fetch(apiUrl);
    const students = await response.json();
    console.log(students);
     
    const studentList = document.getElementById("studentList");
    studentList.innerHTML = "";

    students.forEach(student => {
      const div = document.createElement("div");
      div.className = "student";
      div.innerHTML = `
        <strong>ID:</strong> ${student.id}<br>
        <strong>Name:</strong> ${student.name}<br>
        <strong>Email:</strong> ${student.email}
      `;
      studentList.appendChild(div);
    });
  } catch (error) {
    console.log("Load error:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("studentForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    });

    form.reset();
    loadStudents();
  });

  loadStudents();
});