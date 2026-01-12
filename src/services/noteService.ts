import { type Note } from "../types/note";
import axios from 'axios';

interface ResponseNoteProps { 
    notes: Note[];
    totalPages: number,
}

interface PostNoteProps { 
  title: string,
  content: string,
  tag:string
}

const ACCESS_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api/notes";

export const fetchNotes = async (query: string, page: number = 1,perPage: number = 12):Promise<ResponseNoteProps> => {
    const response = await axios.get<ResponseNoteProps>(BASE_URL, {
        params: {
            search: query,
            page: page,
            perPage: perPage
        },
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
     return response.data;
 }
 
export const createNote = async (data:PostNoteProps): Promise<Note> => { 
    const response = await axios.post<Note>(BASE_URL, data, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
    return response.data;
}

export const deleteNote = async (id: string): Promise<Note> => { 
  const response = await axios.delete<Note>(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
    return response.data;
}