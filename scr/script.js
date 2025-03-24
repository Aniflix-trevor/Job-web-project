document.addEventListener("DOMContentLoaded", () => getJobs());

function getJobs() {
  const options = {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  };

  fetch("http://localhost:3000/jobs", options)
    .then((response) => response.json())
    .then(renderJobs);
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

    jobListDiv.appendChild(jobList);
  });
}
