let editingId = null;


// ===============================
// OTHER COURSE
// ===============================

function showOtherCourse() {

    const course =
        document.getElementById("course").value;

    const otherBox =
        document.getElementById("otherCourseBox");


    if (course === "Others") {

        otherBox.style.display = "block";

    } else {

        otherBox.style.display = "none";

        document.getElementById("otherCourse").value = "";
    }

}


// ===============================
// ADD STUDENT
// ===============================

document
    .getElementById("studentForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value;

        const age =
            document.getElementById("age").value;

        let course =
            document.getElementById("course").value;

        const otherCourse =
            document.getElementById("otherCourse").value;

        const email =
            document.getElementById("email").value;


        if (course === "Others") {

            course = otherCourse;

        }


        const response = await fetch(
            "http://127.0.0.1:8000/student/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name: name,

                    age: Number(age),

                    course: course,

                    email: email

                })
            }
        );


        const data = await response.json();


        if (response.ok) {

            alert("Student added successfully!");


            document
                .getElementById("studentForm")
                .reset();


            document
                .getElementById("otherCourseBox")
                .style.display = "none";


        } else {

            alert("Failed to add student");

            console.log(data);

        }

    });


// ===============================
// EDIT STUDENT
// ===============================

async function editStudent() {

    const id =
        document.getElementById("studentId").value;


    if (!id) {

        alert("Please enter Student ID");

        return;

    }


    const response = await fetch(
        `http://127.0.0.1:8000/student/${id}`
    );


    if (!response.ok) {

        alert("Student not found");

        return;

    }


    const student =
        await response.json();


    // Store ID

    editingId = student.id;


    // Fill form

    document.getElementById("studentId").value =
        student.id;


    document.getElementById("name").value =
        student.name;


    document.getElementById("age").value =
        student.age;


    document.getElementById("email").value =
        student.email;


    const course =
        document.getElementById("course");


    const otherCourse =
        document.getElementById("otherCourse");


    const otherBox =
        document.getElementById("otherCourseBox");


    const options =
        Array.from(course.options)
            .map(option => option.value);


    if (options.includes(student.course)) {

        course.value = student.course;

        otherBox.style.display = "none";

    } else {

        course.value = "Others";

        otherCourse.value = student.course;

        otherBox.style.display = "block";

    }


    // Add hide

    document
        .getElementById("addButton")
        .style.display = "none";


    // Update show

    document
        .getElementById("updateButton")
        .style.display = "inline-block";


    alert("Student details loaded");

}


// ===============================
// UPDATE STUDENT
// ===============================

async function updateStudent() {

    if (editingId === null) {

        alert("Please click Edit first");

        return;

    }


    const name =
        document.getElementById("name").value;


    const age =
        document.getElementById("age").value;


    let course =
        document.getElementById("course").value;


    const otherCourse =
        document.getElementById("otherCourse").value;


    const email =
        document.getElementById("email").value;


    if (course === "Others") {

        course = otherCourse;

    }


    const response = await fetch(
        `http://127.0.0.1:8000/student/${editingId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: name,

                age: Number(age),

                course: course,

                email: email

            })
        }
    );


    const data = await response.json();


    if (response.ok) {

        alert("Student updated successfully!");


        document
            .getElementById("studentForm")
            .reset();


        document
            .getElementById("otherCourseBox")
            .style.display = "none";


        // Add show

        document
            .getElementById("addButton")
            .style.display = "inline-block";


        // Update hide

        document.getElementById("updateButton").style.display = "inline-block";

        document
            .getElementById("updateButton")
            .style.display = "none";


        editingId = null;


    } else {

        alert("Update failed");

        console.log(data);

    }

}

window.addEventListener("DOMContentLoaded", async function () {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) {
        return;
    }

    const response = await fetch(
        `http://127.0.0.1:8000/student/${id}`
    );

    if (!response.ok) {
        alert("Student not found");
        return;
    }

    const student = await response.json();

    editingId = student.id;

    document.getElementById("studentId").value = student.id;
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("email").value = student.email;

    const course = document.getElementById("course");
    const otherCourse = document.getElementById("otherCourse");
    const otherBox = document.getElementById("otherCourseBox");

    const options = Array.from(course.options)
        .map(option => option.value);

    if (options.includes(student.course)) {

        course.value = student.course;
        otherBox.style.display = "none";

    } else {

        course.value = "Others";
        otherCourse.value = student.course;
        otherBox.style.display = "block";
    }

    
    document.getElementById("addButton").style.display = "none";

    
    document.getElementById("updateButton").style.display = "inline-block";
});