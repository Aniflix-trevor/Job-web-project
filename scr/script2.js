const BASE_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => getJobs());



function getJobs() {
  const options = {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  };

  fetch(`${BASE_URL}/jobs`, options)
    .then((response) => response.json())
    .then(renderJobs)
    .catch((err) => console.error(err));
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

    // const location = document.createElement("p");
    // location.classList.add("card-location");
    // location.textContent = job.location;
    // jobContent.appendChild(location);

    const location = document.createElement("p");
    location.textContent = `Location: ${job.location}`;
    jobContent.appendChild(location);

    const description = document.createElement("p");
    description.textContent = job.description;
    jobContent.appendChild(description);

    jobList.append(jobContent);

    jobListDiv.appendChild(jobList);
  });
}

const jobForm = document.querySelector("#job-form");

jobForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(jobForm);
  const data = Object.fromEntries(formData);

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
