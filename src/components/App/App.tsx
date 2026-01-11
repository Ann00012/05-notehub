import css from "./App.module.css";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { fetchNotes, createNote } from "../services/noteService";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import ErrorMessage from "../Error/Error";
import Loader from "../Loader/Loader";
import { NoteList } from "../NoteList/NoteList";
import { useDebounce } from "use-debounce";

export default function App() {
  const perPage = 12;
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [debouncedQuery] = useDebounce(query, 500);
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", debouncedQuery, page, perPage],
    queryFn: () => fetchNotes(debouncedQuery, page, perPage),
    placeholderData: keepPreviousData,
  });

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
    },
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;
  const handleSearch = (newQuery: string) => {
    if (newQuery == query) return;
    setQuery(newQuery);
    setPage(1);
  };
  return (
    <div className={css.app}>
      <Toaster position="top-right" reverseOrder={false} />
      <header className={css.toolbar}>
        <SearchBox value={query} onChange={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>
      <main>
        {isLoading && (
          <div className={css.loaderWrapper}>
            <Loader />
          </div>
        )}
        {isError && <ErrorMessage message="Failed to load notes" />}

        {isSuccess && notes.length > 0 && <NoteList notes={notes} />}

        {isSuccess && query !== "" && notes.length === 0 && (
          <p className={css.info}>No notes found for your search.</p>
        )}
      </main>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={(values) => mutation.mutate(values)}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
