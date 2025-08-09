// app/notes/[id]/NoteDetails.client.tsx

'use client';

import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { getSingleNote } from "@/lib/api";

export default function NoteDetailsClient () {
	const { id } = useParams<{ id: string }>();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Could not fetch the list of notes. {error?.message}</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{formattedDate}</p>
    </div>
  );
};


