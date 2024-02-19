import { useState } from "react"
import { Note } from "../../models/Note"
import "./NotesList.css"

export default function NotesList({ notes }: { notes: Note[] }) {
	return (
		<div className="notes-list">
			{
				notes.map((note) =>
					<NoteView
						title={note.title}
						content={note.content}
					/>
				)
			}
		</div>
	)
}

interface NoteViewProps {
	title: string
	content: string
}

function NoteView({ title, content }: NoteViewProps) {
	const [expanded, setExpanded] = useState(false)

	return (
		<div className="note">
			<div className="note-title" onClick={() => setExpanded(!expanded)}>{title}</div>
			<div className={"note-content " + (expanded ? "" : "note-content-hidden")}>
				<div>{content}</div>
			</div>
		</div>
	)
}