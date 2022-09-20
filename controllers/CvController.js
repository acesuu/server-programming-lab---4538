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

  language = fs.readFileSync("data/language", { encoding: "utf-8" });

  language = JSON.parse(String(language));

  languages = [];

  for (let key in language) {
    languages.push(language[key]);
  }

  skill = fs.readFileSync("data/skill", { encoding: "utf-8" });

  skill = JSON.parse(String(skill));

  skills = [];

  for (let key in skill) {
    skills.push(skill[key]);
  }

  res.render("cv", { name: "Md. Ahnaf Akib", educations: edus, experience: experiences, language: languages, skill:skills});
};

module.exports = { getCV: getCV };
