import { useId, useState } from "react"
import { Note } from "../../models/Note"
import "../../utils/stringUtils"
import "./NoteInput.css"
import { timestampSeconds } from "../../utils/dateUtils"

export default function NoteInput(
	{ onNewNote }: { onNewNote: (note: Note) => void }
) {
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")

	async function saveNote() {
		const res = await (await fetch("/api/notes", {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: title,
				content: content
			})
		})).json()

		setTitle("")
		setContent("")
		
		onNewNote({
			id: res.id,
			title: title,
			content: content,
			createdAt: timestampSeconds(),
			updatedAt: null
		})
	}

	return (
		<div className="note-input">
			<TextInput
				label="Title"
				input={title}
				onInputChange={setTitle}
				multiline={false}
			/>
			<TextInput
				label="Content"
				input={content}
				onInputChange={setContent}
				multiline={true}
			/>
			<button onClick={saveNote} disabled={title.isBlank() || content.isBlank()}>Save</button>
		</div>
	)
}

interface TextInputProps {
	id?: string
	label: string
	input: string
	onInputChange: (input: string) => void
	multiline: boolean
}

function TextInput({
	id = useId(),
	label,
	input,
	onInputChange,
	multiline
}: TextInputProps) {
	const Element = multiline ? "textarea" : "input"

	return (
		<div className="text-input">
			<label htmlFor={id}>{label}</label>
			<Element
				id={id}
				value={input}
				onChange={e => onInputChange(e.target.value)}
			/>
		</div>
	)
}