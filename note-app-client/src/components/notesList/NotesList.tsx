import { useState } from "react"
import { Note } from "../../models/Note"
import "./NotesList.css"

export default function NotesList({ notes, onDeleteClick }: { notes: Note[], onDeleteClick: (id: string) => void }) {
	return (
		<div className="notes-list">
			{
				notes.map((note) =>
					<NoteView
						key={note.id}
						note={note}
						onDeleteClick={() => onDeleteClick(note.id)}
					/>
				)
			}
		</div>
	)
}

function NoteView({ note, onDeleteClick }: { note: Note, onDeleteClick: () => void }) {
	const [expanded, setExpanded] = useState(false)

	return (
		<div className="note">
			<div className="note-handle" onClick={() => setExpanded(!expanded)}>
				<div className="title">{note.title}</div>
				<button
					className="delete"
					onClickCapture={(e) => {
						e.stopPropagation()
						onDeleteClick()
					}}>x</button>
			</div>
			<div className={"note-content " + (expanded ? "" : "note-content-hidden")}>
				<div>{note.content}</div>
			</div>
		</div>
	)
}