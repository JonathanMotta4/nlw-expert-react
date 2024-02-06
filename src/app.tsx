import Logo from './assets/LogoNlwExpert.svg'
import NoteCard from './components/note-card'
import { NewNoteCard } from './components/new-note-card'
export function App() {
  return (
    <div className='max-w-6xl mx-auto my-12 space-y-6'>
      <img src={Logo} alt='Nlw Expert' />
      <form className='w-full '><input type="text" placeholder='Busque em suas notas...' name="" id="" className='w-full text-3xl font-semibold tracking-tight bg-transparent outline-none placeholder:text-slate-500' /></form>
      <div className='h-px bg-slate-700'></div>
      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard />
        <NoteCard />
        <NoteCard />
        <NoteCard />
     

      </div>
    </div>)
}
