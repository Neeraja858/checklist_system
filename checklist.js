const express = require("express");
const axios = require("axios");
const rules = require("../config/rules");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const apiUrl =
      "http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639";
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Evaluate Checklist Rules
    const results = rules.map((rule) => ({
      rule: rule.name,
      passed: rule.check(data),
    }));

    // Render the Dashboard
    res.render("dashboard", { results });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
