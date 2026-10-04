
let currentPage = 1;

let limit = 10;



async function getStudents() {

    try {

        const API_URL = "https://student-management-production-09a1.up.railway.app";

        const response = await fetch(
            `${API_URL}/student/students?page=${currentPage}&limit=${limit}`
        );


        if (!response.ok) {

            throw new Error("Failed to get students");

        }


        const students = await response.json();


        const table =
            document.getElementById("student");


        table.innerHTML = "";


        students.forEach(student => {

            const row = `

                <tr>

                    <td>${student.id}</td>

                    <td>${student.name}</td>

                    <td>${student.age}</td>

                    <td>${student.course}</td>

                    <td>${student.email}</td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editStudent(${student.id})"
                        >
                            Edit
                        </button>


                        <button
                            class="delete-btn"
                            onclick="deleteStudent(${student.id})"
                        >
                            Delete
                        </button>

                    </td>

                </tr>

            `;


            table.innerHTML += row;

        });


        document.getElementById("pageNumber").innerText =
            "Page " + currentPage;


    } catch (error) {

        console.log(error);

        alert("Unable to load students");

    }

}




function editStudent(id) {

    window.location.href =
        `index.html?id=${id}`;

}



async function deleteStudent(id) {

    const confirmDelete =
        confirm("Are you sure you want to delete?");


    if (!confirmDelete) {

        return;

    }


    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: "DELETE"
        }
    );


    if (response.ok) {

        alert("Student deleted successfully!");


        getStudents();

    } else {

        alert("Delete failed");

    }

}




function previousPage() {

    if (currentPage > 1) {

        currentPage--;

        getStudents();

    }

}




function nextPage() {

    currentPage++;

    getStudents();

}




getStudents();

function editStudent(id) {
    window.location.href = `index.html?id=${id}`;
}

