const fs = require("fs");

const getCV = (req, res) => {
  educations = fs.readFileSync("data/education", { encoding: "utf-8" });
  educations = JSON.parse(String(educations));

  edus = [];

  for (let key in educations) {
    edus.push(educations[key]);
  }

  experience = fs.readFileSync("data/experience", { encoding: "utf-8" });

  experience = JSON.parse(String(experience));

  experiences = [];

  for (let key in experience) {
    experiences.push(experience[key]);
  }

  res.render("cv", { name: "Md. Ahnaf Akib", educations: edus, experience: experiences});
};

module.exports = { getCV: getCV };
