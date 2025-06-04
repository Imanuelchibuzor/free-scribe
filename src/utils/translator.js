import axios from "axios";

const translate = async (text, sourceLang = "en", targetLang) => {
  try {
    const url = "https://translate.googleapis.com/translate_a/single";
    const params = {
      client: "gtx",
      sl: sourceLang, // source language
      tl: targetLang,
      dt: "t", // return translated text
      q: text,
    };

    const { data } = await axios.get(url, { params });
    // data[0] is an array of [translatedSegment, originalSegment, ...]
    if (!Array.isArray(data) || !Array.isArray(data[0])) {
      throw new Error("Unexpected response format from Google Translate");
    }

    // Concatenate all translated segments
    const translated = data[0].map((segment) => segment[0]).join("");
    return translated;
  } catch (error) {
    console.error(`Translation error (${targetLang}):`, error.message);
    // Fallback: return original text
    return text;
  }
};

export default translate;
