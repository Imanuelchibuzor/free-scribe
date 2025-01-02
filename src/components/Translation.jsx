import PropTypes from "prop-types"
import { useState } from "react"
import { LANGUAGES } from "../utils/presets"

export default function Translation({message}) {
  const [toLanguage, setToLanguage] = useState('')
  const [istranslating, setIsTranslating] = useState(false)
  const [translatedMessage, setTranslatedMessage] = useState('')

  setTranslatedMessage


  function translateText () {
    setIsTranslating(true)
    console.log('Translating...')

    const text = message;
    const targetLanguage = toLanguage;

    fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,             // Text to translate
        target: targetLanguage, // Target language
        source: '',        // Source language (optional if auto-detect is enabled)
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => console.log(data.translatedText)) // Access the translated text
      .catch(error => console.error('Error:', error));
  }

  return (
    <main className="flex flex-col gap-5  w-full max-w-[800px]">
      <div className="flex flex-col gap-1 max-w-[400px] mx-auto">
        <p className="text-xs sm:text-sm font-medium text-slate-500 mx-auto mb-2">To Language</p>

        <div className="flex items-stretch gap-2">
          <select 
            value={toLanguage} 
            onChange={(e) => setToLanguage(e.target.value)}
            className="flex-1 specialBtn outline-none bg-white focus:outline-none border border-solid border-transparent hover:border-blue-300 duration-300 p-2 rounded">
              <option value={'Select Language'}>Select Language</option>
              {Object.entries(LANGUAGES).map(([key, value]) => {
                return (
                  <option key={key} value={value}>{key}</option>
                )
              })}
          </select>
          <button onClick={translateText}
          className="specialBtn px-3 py-2 rounded-lg text-blue-400 hover:text-blue-600 duration-200">
            Translate
          </button>
        </div>
      </div>

      <div className="grid place-items-center">
        {istranslating ? <i className="fa-solid fa-spinner animate-spin my-4"></i> : ''}
      </div>

      <div className="flex-1 flex flex-col gap-3 text-center sm:gap-2 w-full max-w-auto justify-center"> 
        {translatedMessage ? translatedMessage : message}
      </div>
    </main>
    
  )
}

Translation.propTypes = {
  message: PropTypes.string,
}