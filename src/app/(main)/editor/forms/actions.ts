"use server";

import openai from "@/lib/openai";
import {
  GenerateSummaryInput,
  generateSummarySchema,
  WorkExperience,
} from "@/lib/validation";

export async function generateSummary(input: GenerateSummaryInput) {
  // TODO: Add premium check
  const {
    jobTitle,
    workExperiences = [],
    educations = [],
    skills = [],
  } = generateSummarySchema.parse(input);

  const systemMessage = `You are an expert career coach. Generate a concise, compelling, and professional resume summary.
  - Tailor the summary to the provided job title.
  - Highlight key skills, experiences, and education.
  - Keep it under 4 sentences.
  - Use strong, confident, action-oriented language.
  - Avoid repeating job titles unnecessarily.`;

  const userMessage = `
  Please create a professional summary for a resume based on the following details:

  Job Title: ${jobTitle || "N/A"}

  Work Experiences:
  ${workExperiences
    .map(
      (exp) => `
      Position: ${exp.position || "N/A"}
      Company: ${exp.company || "N/A"}
      Start Date: ${exp.startDate || "N/A"}
      End Date: ${exp.endDate || "Present"}
      Description: ${exp.description || "N/A"}`,
    )
    .join("\n\n")}

  Education:
  ${educations
    .map(
      (edu) => `
      Degree: ${edu.degree || "N/A"}
      School: ${edu.school || "N/A"}
      Start Date: ${edu.startDate || "N/A"}
      End Date: ${edu.endDate || "N/A"}`,
    )
    .join("\n\n")}

  Skills: ${Array.isArray(skills) ? skills.join(", ") : skills || "N/A"}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });

  const aiResponse = completion.choices[0].message?.content?.trim();

  if (!aiResponse) {
    throw new Error("AI failed to generate a summary. Please try again.");
  }

  return aiResponse;
}

export async function generateWorkExperience(input: GenerateSummaryInput) {
  // TODO: Add premium check

  const { description } = generateSummarySchema.parse(input);

  const systemMessage = `You are an expert career coach. Generate a concise, compelling, and professional work experience description.
  - Highlight key skills, experiences, and achievements.
  - Keep it under 4 sentences.
  - Use strong, confident, action-oriented language.
  
  Job title: <job title>
  Company: <company name>
  Start date: <format: YYYY-MM-DD> (only if provided)
  End date: <format: YYYY-MM-DD or Present> (only if provided)
  Description: <description of role and responsibilities>
  `;

  const userMessage = `
  Please create a professional work experience description for a resume based on the following details:

  ${description || "N/A"}
  `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });

  const aiResponse = completion.choices[0].message?.content?.trim();

  if (!aiResponse) {
    throw new Error("AI failed to generate a summary. Please try again.");
  }

  console.log("aiResponse", aiResponse);

  return {
    position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
    company: aiResponse.match(/Company: (.*)/)?.[1] || "",
    startDate: aiResponse.match(/Start date: (.*)/)?.[1] || "",
    endDate: aiResponse.match(/End date: (.*)/)?.[1] || "",
    description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
  } satisfies WorkExperience;
}
