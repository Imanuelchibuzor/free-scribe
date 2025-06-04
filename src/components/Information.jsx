import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Transcribing from "./Transcribing";
import Transcription from "./Transcription";
import Translation from "./Translation";

export default function Information() {
  const [tab, setTab] = useState('transcription');
  const [displayNext, setDisplayNext] = useState(true);
  const location = useLocation();
  const { state } = location || {};
  const sourceLang = state?.language || 'en';
  const transcribedText = state?.message || 'No message was passed';


  useEffect(() => {
    // Automatically navigate to Route B after 5 seconds
    const timer = setTimeout(() => {
      setDisplayNext(false);
    }, 3000); // 5 seconds delay

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(transcribedText)
      .then(() => console.log("Text copied to clipboard"))
      .catch((err) => console.error("Failed to copy text:", err));
  }

  function handleDownload() {
    const element = document.createElement('a');
    const file = new Blob([transcribedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Freescribe_${new Date().toDateString()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <section className="min-h-screen flex flex-col">
      <Header />

      {displayNext ? 
      (<Transcribing />) 
        : 
      (<div className="flex items-center flex-1 flex-col gap-10 md:gap-14 justify-center pb-10 p-4">
        <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
          Your <span className="text-blue-400 bold">Transcription</span>
        </h1>

        <div className="grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden items-center">
          <button
            onClick={() => setTab('transcription')}
            className={`px-4 py-1 duration-200 font-medium ${tab === 'transcription' ? 'bg-blue-400 text-white' : 'text-blue-400 hover:text-blue-600'}`}>
            Transcription
          </button>
          <button
            onClick={() => setTab('translation')}
            className={`px-4 py-1 duration-200 font-medium ${tab === 'translation' ? 'bg-blue-400 text-white' : 'text-blue-400 hover:text-blue-600'}`}>
            Translation
          </button>
        </div>

        <div className="flex flex-col">
          {tab === 'transcription' ?
            (<Transcription message={transcribedText} />)
            :
            (<Translation sourceLang={sourceLang} message={transcribedText} />)
          }
        </div>

        <div className="flex items-center gap-4 mx-auto">
          <button 
            title="Copy"
            onClick={handleCopy}
            aria-label="Copy transcription to clipboard"
            className="bg-white hover:text-blue-500 duration-200 text-blue-300 px-2 aspect-square grid place-items-center rounded">
            <i className="fa-solid fa-copy"></i>
          </button>
          <button 
            title="Download"
            onClick={handleDownload}
            aria-label="Download transcription as file"
            className="bg-white hover:text-blue-500 duration-200 text-blue-300 px-2 aspect-square grid place-items-center rounded">
            <i className="fa-solid fa-download"></i>
          </button>
        </div>
      </div>)}
    </section>
  );
}
