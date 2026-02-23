import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/env";

export const publicClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});
