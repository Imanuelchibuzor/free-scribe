export default function Transcribing() {

  return (
    <section className="min-h-screen flex flex-col">
      <div className='flex items-center flex-1 flex-col gap-10 md:gap-14 justify-center pb-24 p-4'>
        <div className="flex flex-col gap-2 sm:gap-4">
          <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl"><span className="text-blue-400 bold">Transcribing</span></h1>
          <p>processing audio...</p>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3 max-w-[500px] mx-auto w-full">
          {[0, 1, 2].map(val => {
            return (
              <div key={val} className={'rounded-full h-2 sm:h-3 bg-slate-400 loading ' + `loading${val}`}></div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
