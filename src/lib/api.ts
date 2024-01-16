import { Tags, type Story, type StoryComment } from "./types";

const HN_BASE_URL = "http://hn.algolia.com/api/v1";

export async function getFrontPage() {
  const response = await fetch(`${HN_BASE_URL}/search?tags=front_page`);
  const data = await response.json();
  return data.hits;
}

export async function getTopStories(params: {
  page: number;
}): Promise<Story[]> {
  const queryParams = `tags=${Tags.Story}&hitsPerPage=100&page=${params.page}`;

  const response = await fetch(`${HN_BASE_URL}/search_by_date?${queryParams}`);
  const data = await response.json();
  return data.hits;
}

export async function getAskHN(params: { page: number }): Promise<Story[]> {
  const queryParams = `tags=${Tags.AskHN}&hitsPerPage=100&page=${params.page}`;

  const response = await fetch(`${HN_BASE_URL}/search_by_date?${queryParams}`);
  const data = await response.json();
  return data.hits;
}

export async function getCommentsByStoryId(params: {
  storyId: number;
}): Promise<StoryComment[]> {
  const queryParams = `tags=comment,story_${params.storyId}`;
  const response = await fetch(`${HN_BASE_URL}/search?${queryParams}`);
  const data = await response.json();
  return data.hits;
}

export async function getResultsFromSearch(params: {
  page: number;
  query: string;
}) {
  const queryParams = `tags=${Tags.Story}&hitsPerPage=100&page=${params.page}&query=${params.query}`;

  const response = await fetch(`${HN_BASE_URL}/search?${queryParams}`);
  const data = await response.json();
  return data;
}

export async function getStoryById(params: { storyId: number }) {
  const response = await fetch(`${HN_BASE_URL}/items/${params.storyId}`);
  const data = await response.json();
  return data;
}

export async function getQuestions(params: { page: number }): Promise<Story[]> {
  const queryParams = `tags=${Tags.AskHN}&hitsPerPage=100&page=${params.page}`;

  const response = await fetch(`${HN_BASE_URL}/search_by_date?${queryParams}`);
  const data = await response.json();
  return data.hits;
}
