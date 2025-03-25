document.addEventListener("DOMContentLoaded", () => getJobs());

document.getElementById("search").addEventListener("input", filterJobs);

let allJobs = [];

function getJobs() {
  const options = {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  };

  fetch("http://localhost:3000/jobs", options)
    .then((response) => response.json())
    .then((jobs) => {
      allJobs = jobs;
      renderJobs(jobs);
    });
  // .catch((err) => console.error(err));
}

function renderJobs(jobs) {
  const jobListDiv = document.getElementById("card");

  jobListDiv.innerHTML = "";

  jobs.forEach((job) => {
    console.log(job);

    const jobList = document.createElement("div");
    jobList.classList.add("card", "job");

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = job.image;
    img.alt = job.title;
    img.height = "200";

    jobList.appendChild(img);

    const jobContent = document.createElement("div");
    jobContent.classList.add("card-body");

    const title = document.createElement("h3");
    title.classList.add("card-title");
    title.textContent = job.title;
    jobContent.appendChild(title);

    jobList.append(jobContent);

    // const location = document.createElement("p");
    // location.classList.add("card-location");
    // location.textContent = job.location;
    // jobContent.appendChild(location);

    const location = document.createElement("p");
    location.textContent = `Location: ${job.location}`;
    jobContent.appendChild(location);

    const viewButton = document.createElement("button")
    viewButton.textContent= "View"
    viewButton.classList.add("btn", "btn-info", "m-1")
       viewButton.setAttribute("data-bs-toggle", "modal");
       viewButton.setAttribute("data-bs-target", "#jobDetailsModal");
       viewButton.addEventListener("click",() => viewJob(job))
       jobContent.appendChild(viewButton)

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", () => deleteJob(job.id));
    jobContent.appendChild(deleteButton);

    // const description = document.createElement("p");
    // description.textContent = job.description;
    // jobContent.appendChild(description);

    jobList.append(jobContent);

    jobListDiv.appendChild(jobList);
  });
}

const jobForm = document.querySelector("#job-form");

jobForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(jobForm);
  const data = Object.fromEntries(formData);

  const BASE_URL = "http://localhost:3000";

  const url = data.id ? `${BASE_URL}/jobs/${data.id}` : `${BASE_URL}/jobs`;

  fetch(url, {
    method: data.id ? "PATCH" : "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      jobForm.reset();
      getJobs();
    })
    .catch((err) => console.error(err));
});

function filterJobs() {
  const searchValue = document
    .getElementById("search")
    .value.toLocaleLowerCase();
  const filteredJobs = allJobs.filter((job) =>
    job.title.toLocaleLowerCase().includes(searchValue)
  );
  renderJobs(filteredJobs);
}

function deleteJob(jobId) {
  const options = {
    method: "DELETE",
  };

  fetch(`http://localhost:3000/jobs/${jobId}`, options)
    .then((response) => response.json())
    .then(() => {
      getJobs();
    })
    .catch((err) => console.error(err));
}

function viewJob(job){
  document.getElementById("job-title").textContent = job.title;
  document.getElementById(
    "job-company"
  ).textContent = `Company: ${job.company}`;
  document.getElementById(
    "job-location"
  ).textContent = `Location: ${job.location}`;
  document.getElementById("job-salary").textContent = `Salary: $${job.salary}`;
  document.getElementById("job-description").textContent = job.description;
  document.getElementById("job-image").src = job.image;
}