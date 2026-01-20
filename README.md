# NoteHub — Notes Management Application

**NoteHub** is a modern web application built with React.js for creating, viewing, and managing personal notes. 

##  Tech Stack

* **Framework:** React
* **Data Fetching:** [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
* **Styling:** CSS Modules 
* **HTTP Client:** Axios
* **Notifications:** React Hot Toast
* **Language:** TypeScript
* **Deployment:** Vercel

##  Features

- **Note Navigation:** Dynamic rendering and filtering of notes based on user interaction
-  **CRUD Support:** Managed note creation via a modal system and centralized noteService
- **Search Optimization:** Uses Debouncing to reduce API calls while typing in the search box.
- **Pagination:** Utilizes TanStack Query's keepPreviousData to ensure a smooth UI experience without flickering when switching pages.
- **Error Handling:** Features global error states, custom Loader components, and real-time toast notifications via React Hot Toast for instant user feedback.


