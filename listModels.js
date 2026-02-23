// listModels.js
import fetch from "node-fetch";   // npm i node-fetch@3
import 'dotenv/config';

async function listModels() {
  const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error("Error listing models:", await response.text());
    return;
  }

  const data = await response.json();
  const models = data.models || [];

  console.log("Available Models:");
  models.forEach((model) => {
    console.log(model.name, "- supported actions:", model.supportedActions);
  });
}

listModels();