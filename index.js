document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.getElementById('login-container');
    const trackerContainer = document.getElementById('tracker-container');
    const jobForm = document.getElementById('job-form');
    const applicationsList = document.getElementById('applications-list');
    const loginError = document.getElementById('login-error');

    const validUsername = "user"; // Replace with actual username
    const validPassword = "password"; // Replace with actual password

    let applications = [];

    // Login Logic
    // Login Logic
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Allow login with any username and password
        if (username && password) {
            loginContainer.style.display = 'none';
            trackerContainer.style.display = 'block';
        } else {
            loginError.textContent = 'Please enter a valid email and password.';
        }
    });


    // Job Application Logic
    jobForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const company = document.getElementById('company').value;
        const status = document.getElementById('status').value;
        const interviewDate = document.getElementById('interviewDate').value;

        const newApplication = {
            title,
            company,
            status,
            interviewDate,
        };

        applications.push(newApplication);
        renderApplications();
        jobForm.reset();
    });

    function renderApplications() {
        applicationsList.innerHTML = '';
        applications.forEach((app, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${app.title} at ${app.company} - ${app.status} | Interview: ${new Date(app.interviewDate).toLocaleDateString()}
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            applicationsList.appendChild(li);
        });

        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                applications.splice(index, 1);
                renderApplications();
            });
        });
    }
});
