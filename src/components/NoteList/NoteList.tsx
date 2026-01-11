import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService";
import { type NoteProps } from "../../types/note";
import css from "./NoteList.module.css";
import toast from "react-hot-toast";

interface NoteListProps {
  notes: NoteProps[];
}

export const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string | number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted!");
    },
    onError: () => {
      toast.error("Failed to delete note.");
    },
  });

  if (notes.length === 0) return null;

  return (
    <ul className={css.list}>
      {notes.map((note: NoteProps) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              type="button"
              aria-label={`Delete note: ${note.title}`}
              onClick={() => mutation.mutate(note.id)}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
