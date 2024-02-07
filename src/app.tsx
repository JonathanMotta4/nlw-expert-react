import Logo from './assets/LogoNlwExpert.svg'
import NoteCard from './components/note-card'
import { NewNoteCard } from './components/new-note-card'
import { ChangeEvent, useState } from 'react'

interface Note {
  id: string
  date: Date
  content: string
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')
    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    } else {
      return []
    }
  })

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }
    const notesArray = [newNote, ...notes]
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }
  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => {
      return note.id !== id
    })
    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }
  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value
    setSearch(query)
  }
  const filteredNotes =
    search !== ''
      ? notes.filter((note) =>
        note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      )
      : notes
  return (
    <div className="max-w-6xl px-5 mx-auto my-12 space-y-6 ">
      <img src={Logo} alt="Nlw Expert" />
      <form className="w-full ">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          name=""
          id=""
          className="w-full text-3xl font-semibold tracking-tight bg-transparent outline-none placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>
      <div className="h-px bg-slate-700"></div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 auto-rows-[250px] gap-6">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map((n) => {
          return <NoteCard key={n.id} note={n} onNoteDeleted={onNoteDeleted} />
        })}
      </div>
    </div>
  )
}
