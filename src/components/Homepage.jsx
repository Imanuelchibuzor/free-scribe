import { useState, useEffect,} from "react";
import { browserLanguages } from "../utils/presets";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [isListening, setIsListening] = useState(false); // To track listening status
  const [duration, setDuration] = useState(0);
  const [userLanguage, setUserLanguage] = useState('Select Language');
  const [recognition, setRecognition] = useState(null); // Store SpeechRecognition instance
  const [transcribedText, setTranscribedText] = useState('');

  const navigate = useNavigate();
  

    const handleStartStopListening = () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.error("Speech Recognition API is not supported in this browser.");
        return;
      }

      if (isListening) {
        // Stop listening
        if (recognition) {
          recognition.stop();
          console.log("Speech recognition stopped.");
          setIsListening(false);
          setDuration(0);
          return;
        }
      } 
      if (userLanguage === 'Select Language') {
          alert("Please select a language.");
          return;
      }
      else {
        // Start listening
        const newRecognition = new SpeechRecognition();
        newRecognition.lang = userLanguage; // Set language
        newRecognition.continuous = true; // Allow continuous listening
        newRecognition.interimResults = true; // Only save final results

        newRecognition.onstart = () => {
          console.log("Speech recognition started...");
        };

        newRecognition.onresult = (event) => {
          let newTranscript = ''; // Temporary variable to hold new transcription

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];

            // Only add final results
            if (result.isFinal) {
              newTranscript += result[0].transcript; // Add the final transcription to the newTranscript
            }
          }
          setTranscribedText(prevTranscript => prevTranscript + newTranscript); // Save to temporary storage
          console.log("Final Transcript:", newTranscript); // Log only the final result
        };

        newRecognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
        };

        newRecognition.onend = () => {
          console.log("Speech recognition ended.");
          setIsListening(false);
          console.log(transcribedText)
        };

        try {
          newRecognition.start();
          setRecognition(newRecognition);
          setIsListening(true);
        } catch (error) {
          console.error("Error starting speech recognition:", error);
        }
        
      }
    };

    const handleTranscribe = () => {
      if(!transcribedText) {
        alert('No audio available to transcribe.');
      } else {
        console.log('Transcribing...', transcribedText);
        navigate('/output', { state: { message: transcribedText } });
      }
    };

  useEffect(() => {
    if (isListening === false) {return}

    const interval = setInterval(() => {
      setDuration(curr => curr + 1)
    }, 1000)

    return () => clearInterval(interval)
  })
    
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Free<span className="text-blue-400 bold">Scribe</span>
      </h1>

      <h3 className="font-medium md:text-lg">
        Record <span className="text-blue-400">&rarr;</span> Transcribe <span className="text-blue-400">&rarr;</span> Translate
      </h3>

      <div className="items-stretch gap-2 max-w-[400px] mx-auto py-6">
        <p className="text-base font-medium">Select Your Language</p>
        <select 
          value={userLanguage} 
          onChange={(e) => setUserLanguage(e.target.value)}
          className="flex-1 outline-none bg-white focus:outline-none border border-solid border-transparent hover:border-blue-300 duration-300 p-2 rounded">
          <option value={'Select Language'}>Select Language</option>
          {Object.entries(browserLanguages).map(([key, value]) => {
            return (
              <option key={key} value={value}>{key}</option>
            )
          })}
        </select>
      </div>
      <button onClick={handleStartStopListening}
      className="flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto  w-72 max-w-full my-4">
        <p className="text-blue-400 hover:text-blue-600 hover:font-medium">
          {isListening === false ? 'Record' : `Stop recording`}
        </p>
        <div className="flex items-center gap-2">
          {duration !== 0 && (<p className="text-sm text-blue-400 font-medium">{duration}s</p>)}
          <i className={"fa-solid duration-200 fa-microphone " + (isListening === true ? 'text-rose-600' : '')}></i>
        </div>
      </button>

      {transcribedText ? (<p className="text-base font-medium text-blue-400 italic">Speech Recorded</p>) : null}
      
      <div className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4">
        <button 
        onClick={() => {
          setTranscribedText('') 
          console.log('Transcribed text reset.')}
        }
        className="specialBtn px-3 p-2 rounded-lg text-blue-300 hover:text-blue-600 flex items-center gap-2 font-medium">
          Reset
        </button>
          <button onClick={handleTranscribe}
          className="specialBtn px-3 p-2 rounded-lg text-blue-300 hover:text-blue-600 flex items-center gap-2 font-medium">
            Transcribe
          <i className="fa-solid fa-pen-nib"></i>
        </button>
      </div>

      <p className="italic text-slate-400">Free now free forever</p>

    </main>
  )
}
