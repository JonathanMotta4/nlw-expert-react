import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
interface NoteCardProps {
  note: {
    id: string
    date: Date
    content: string
  }
  onNoteDeleted: (id: string) => void
}

const NoteCard = ({ note, onNoteDeleted }: NoteCardProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="relative flex flex-col gap-3 p-5 overflow-hidden text-left rounded-md outline-none bg-slate-800 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-300">
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
        </span>
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none h-1/2 bg-gradient-to-t from-black/60 to-black/0"></div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className=" fixed md:left-1/2 md:top-1/2 inset-0 md:inset-0 md:-translate-x-1/2 md:-translate-y-1/2  md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 outline-none">
            <X className="size-5" />
          </Dialog.Close>
          <div className="flex flex-col flex-1 gap-3 p-5 ">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.date, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>
          <button
            type="button"
            className="w-full py-4 text-sm font-medium text-center outline-none bg-slate-800 text-slate-300 group"
          >
            Deseja{' '}
            <span
              className="text-red-400 group-hover:underline"
              onClick={() => onNoteDeleted(note.id)}
            >
              apagar essa nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
export default NoteCard
