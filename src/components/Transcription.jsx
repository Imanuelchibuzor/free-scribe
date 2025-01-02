import PropTypes from "prop-types"
export default function Transcription({message}) {

  return (
    <div className="flex-1 flex flex-col gap-3 text-center sm:gap-4 justify-center max-w-[800px]">
      {message}
    </div>
  )
}

Transcription.propTypes = {
  message: PropTypes.string,
}