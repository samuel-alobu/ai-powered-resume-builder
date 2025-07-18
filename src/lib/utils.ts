import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeServerData } from "./types";
import { ResumeValues } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    title: data.title || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    phone: data.phone || undefined,
    email: data.email || undefined,
    workExperiences: data.workExperiences.map(
      (exp: ResumeServerData["workExperiences"][number]) => ({
        position: exp.position || undefined,
        company: exp.company || undefined,
        startDate: exp.startDate?.toISOString().slice(0, 10),
        endDate: exp.endDate?.toISOString().slice(0, 10),
        description: exp.description || undefined,
      }),
    ),
    educations: data.educations.map(
      (edu: ResumeServerData["educations"][number]) => ({
        degree: edu.degree || undefined,
        school: edu.school || undefined,
        startDate: edu.startDate?.toISOString().slice(0, 10),
        endDate: edu.endDate?.toISOString().slice(0, 10),
      }),
    ),
    skills: data.skills,
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    summary: data.summary || undefined,
  };
}
