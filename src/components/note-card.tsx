const NoteCard = () => {
  return (
    <button className="p-5 space-y-3 relative overflow-hidden  text-left rounded-md bg-slate-800 hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
      <span className='text-sm font-medium text-slate-300'>Há 2 dias</span>
      <p className='text-sm leading-6 text-slate-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate asperiores vero sequi nulla enim distinctio temporibus tenetur molestias reiciendis doloremque.</p>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
    </button>
  )
}
export default NoteCard