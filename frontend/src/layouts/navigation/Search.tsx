import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  // const router = useRouter();
  const navigate = useNavigate();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.log("Trình duyệt không hỗ trợ nhận diện giọng nói.");
    }
  }, [browserSupportsSpeechRecognition]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery(""); // Reset searchQuery sau khi search
    }
  };

  const startListening = () => {
    resetTranscript(); // Reset transcript trước khi bắt đầu
    SpeechRecognition.startListening({ continuous: true, language: "vi-VN" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    if (transcript.trim()) {
      setSearchQuery(transcript.trim()); // Cập nhật searchQuery với transcript mới
      // router.push(`/search?keyword=${encodeURIComponent(transcript.trim())}`); // Điều hướng với transcript mới
      navigate(`/search?keyword=${encodeURIComponent(transcript.trim())}`)
      resetTranscript(); // Reset transcript ngay sau khi sử dụng
      setSearchQuery(""); // Reset searchQuery sau khi điều hướng
    }
  };

  return (
    <div className="flex w-full h-full items-center p-1">
      <form
        onSubmit={handleSearch}
        className="h-auto w-full bg-white rounded flex md:relative md:mr-22 justify-center items-center"
      >
        <input
          type="text"
          placeholder="search entire store here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="focus:outline-none h-10 items-center justify-center px-2 text-black text-sm w-full md:h-10"
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-secondary text-white p-1  rounded mr-1 lg:mr-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button
          onClick={listening ? stopListening : startListening}
          className={`absolute mr-2 text-2xl right-10 top-1/2 transform -translate-y-1/2 p-1 rounded ${
            listening ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          <FaMicrophone />
        </button>
      </form>
    </div>
  );
}
