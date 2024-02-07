import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void
}

export const NewNoteCard = ({ onNoteCreated }: NewNoteCardProps) => {
  const [isRecording, setIsRecording] = useState(false)
  const [shouldShowOnboard, setShouldShowOnboard] = useState(true)
  const [content, setContent] = useState('')
  function handleStartEditor() {
    setShouldShowOnboard(false)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)
    if (event.target.value === '') {
      setShouldShowOnboard(true)
    }
  }
  function handleSaveNote(event: FormEvent) {
    event.preventDefault()
    if (content === '') {
      return
    }
    onNoteCreated(content)
    setContent('')
    setShouldShowOnboard(true)
    toast.success('Nota criada com sucesso!')
  }

  // eslint-disable-next-line no-undef
  let speechRecognition: SpeechRecognition | null
  function handleStartRecording() {
    const isSpeechRecognitionAPIAvaliable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
    if (!isSpeechRecognitionAPIAvaliable) {
      alert('Infelizmente seu navegador não suporta a API de gravação')
      return
    }
    setIsRecording(true)
    setShouldShowOnboard(false)
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()
    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')
      setContent(transcription)
    }
    speechRecognition.onerror = (event) => {
      console.error(event)
    }
    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)
    if (speechRecognition) {
      speechRecognition?.stop()
    }
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col gap-3 p-5 text-left rounded-md outline-none bg-slate-700 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className=" fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2  md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none overflow-hidden">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 outline-none">
            <X className="size-5" />
          </Dialog.Close>
          <form className="flex flex-col flex-1 ">
            <div className="flex flex-col flex-1 gap-3 p-5 ">
              <span className="text-sm font-medium text-slate-300">
                Adicionar Nota
              </span>
              {shouldShowOnboard ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{' '}
                  <button
                    type="button"
                    className="font-medium text-lime-400 hover:underline"
                    onClick={handleStartRecording}
                  >
                    gravando uma nota
                  </button>{' '}
                  em áudio ou se preferir{' '}
                  <button
                    type="button"
                    className="font-medium text-lime-400 hover:underline "
                    onClick={handleStartEditor}
                  >
                    utilize apenas texto
                  </button>
                  .
                </p>
              ) : (
                <textarea
                  autoFocus
                  className="flex-1 text-sm leading-6 bg-transparent outline-none resize-none text-slate-400"
                  onChange={handleContentChanged}
                  value={content}
                ></textarea>
              )}
            </div>
            {isRecording ? (
              <button
                type="button"
                className="flex items-center justify-center w-full gap-2 py-4 text-sm font-medium text-center outline-none bg-slate-900 text-slate-300 hover:text-slate-100"
                onClick={handleStopRecording}
              >
                <div className="bg-red-500 rounded-full size-3 animate-pulse" />
                Gravando! (Clique para interromper)
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveNote}
                className="w-full py-4 text-sm font-medium text-center outline-none bg-lime-400 text-lime-950 hover:bg-lime-500"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
