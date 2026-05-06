document.addEventListener("DOMContentLoaded", function() {
    const regForm = document.getElementById("registrationForm");
    
    if (regForm) {
        regForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const btn = document.getElementById("submitBtn");
            const spinner = document.getElementById("spinner");
            
            // Show loading state
            btn.disabled = true;
            spinner.classList.remove("d-none");

            // Gather data from the form
            const userData = {
                id: Date.now(),
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                course: document.getElementById("course").value,
                timestamp: new Date().toLocaleString()
            };

            // Compulsory AJAX POST method
            // Sending to a mock JSON API placeholder just to fulfill the AJAX requirement.
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 201) {
                        // Success! Data posted via AJAX. 
                        console.log("AJAX POST Response:", JSON.parse(xhr.responseText));
                        
                        // Push to array/local storage as required
                        let usersArray = JSON.parse(localStorage.getItem("registeredUsers")) || [];
                        usersArray.push(userData);
                        localStorage.setItem("registeredUsers", JSON.stringify(usersArray));
                        
                        // Redirect to the data list in new page
                        window.location.href = "list.html";
                    } else {
                        // Handle error
                        alert("Error in AJAX POST request");
                        btn.disabled = false;
                        spinner.classList.add("d-none");
                    }
                }
            };
            
            // Send the request payload
            xhr.send(JSON.stringify(userData));
        });
    }
    
    // Logic for populating list.html
    const userTableBody = document.getElementById("userTableBody");
    if (userTableBody) {
        let usersArray = JSON.parse(localStorage.getItem("registeredUsers")) || [];
        
        if (usersArray.length === 0) {
            userTableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center py-4 text-muted">
                        No users registered yet.
                    </td>
                </tr>`;
        } else {
            usersArray.forEach((user, index) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td class="ps-3 fw-bold">${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td><span class="badge bg-primary bg-opacity-25 text-primary border border-primary">${user.course}</span></td>
                    <td><small class="text-muted">${user.timestamp}</small></td>
                `;
                userTableBody.appendChild(tr);
            });
        }
    }
});

// Function to clear local storage data
function clearData() {
    if(confirm("Are you sure you want to clear all registration data?")) {
        localStorage.removeItem("registeredUsers");
        location.reload();
    }
}
