import PropTypes from "prop-types"
import { useState } from "react"
import { LANGUAGES } from "../utils/presets"

export default function Translation({message}) {
  const [toLanguage, setToLanguage] = useState('')
  const [istranslating, setIsTranslating] = useState(false)
  const [translatedMessage, setTranslatedMessage] = useState('')

  async function handleTranslation() {
    if (!toLanguage) {
      alert('Please select a target language');
      return
    }

    console.log('Translating...');
    setIsTranslating(true);

    setTimeout(() => {
      setTranslatedMessage('Hello, thank you for using our translation service!. We currently have an issue with our translation provider, but we will resolve the issue as soon as possible. Thank you for your understanding');
      setIsTranslating(false);
    }, 3000)
  }

  // function translateText() {
  //   setIsTranslating(true);
  //   console.log('Translating...');

  //   const apiKey = 'API_KEY'
  //   const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  //   fetch(url, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       q: message,          // Text to translate
  //       target: toLanguage,  // Target language
  //       format: 'text',      // Format of the input text
  //     }),
  //   })
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       const translatedText = data.data.translations[0].translatedText;
  //       setTranslatedMessage(translatedText);
  //       console.log('Translated Text:', translatedText);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     })
  //     .finally(() => {
  //       setIsTranslating(false);
  //     });
  // }

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
          <button onClick={handleTranslation}
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