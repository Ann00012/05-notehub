import { type NoteProps } from "../types/note";
import axios from 'axios';

interface ResponseNoteProps { 
    notes: NoteProps[];
    page: number,
    totalPages: number,
    perPage: number
}

interface PostNoteProps { 
  "title": string,
  "content": string,
  "tag":string
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
 
export const createNote = async (data:PostNoteProps): Promise<NoteProps> => { 
    const response = await axios.post<NoteProps>(BASE_URL, data, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
    return response.data;
}

export const deleteNote = async (id: string | number): Promise<NoteProps> => { 
  const response = await axios.delete<NoteProps>(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
    return response.data;
}