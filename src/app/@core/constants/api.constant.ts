import { environment } from "../../../environments/environment.development";

const API_BASE_URL = environment.apiUrl;

export const API_ENDPOINTS = {
  NOTES: `${API_BASE_URL}/notes`,
  NOTES_BY_ID: (id: number) => `${API_BASE_URL}/notes/${id}`,
};