// import { useQuery } from "@tanstack/react-query";

// import { NoteData } from "@/compose/types";

// import { axios, Query, Route } from "..";

// const fetchNote = (noteId: string) => {
//   return axios.get(`${Route.Note}/${noteId}`);
// };

// const useNoteData = (
//   noteId: string,
//   onSuccess?: (noteData: NoteData) => void,
//   onError?: (error: any) => void
// ) => {
//   return useQuery([Query.Note, noteId], () => fetchNote(noteId), {
//     onSuccess,
//     onError,
//     select: (response: any) => response?.data,
//   });
// };
