import { useState } from "react";
import { FaYoutube } from "react-icons/fa";

interface VideoInfo {
  title: string;
  formats: { [key: string]: string | null | undefined }[]; // or more specific type for formats
}
export default function YouTube() {
  const [url, setUrl] = useState("");
  const [btnstatus, setstatus] = useState(false);
  const [reset,setreset] =useState('Process')
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState<null | string>();

  const handleDownload = async () => {
    try {
      const response = await fetch("/api/loaderfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Upps Failed to fetch video info");

      }
      setreset('Reset')
      const data = await response.json();
      setVideoInfo(data);
      if(reset ==='Reset'){
        setreset('Process')
        setUrl('')
        setVideoInfo(null)
      }

      
      setError(null);
    } catch (error) {
      setError((error as string) + "");
      setVideoInfo(null);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-24">
      <div className="flex flex-col items-center gap-1 ">
        <label className="flex gap-1 items-center">
          <FaYoutube className="text-red-500 sm:text-6xl text-3xl" />
          <h1 className="text-3xl sm:text-7xl gap-2">
            <span className="text-red-500 font-bold">YouTube.</span>
          </h1>
        </label>
        <p className="pt-1 text-xl sm:text-4xl"> Video Downloader</p>
      </div>

      <div className="flex flex-col mt-8 w-full items-center">
        <h1 className="text-md pb-1 sm:text-xl">Please Input <span className="text-red-500 font-bold">YouTube.</span> Url Video</h1>
        <div className="flex gap-5 w-full justify-center  ">
          <label className="input border border-amber-50 rounded-md bg-transparent ">
            <input
              type="text"
              placeholder="Enter YouTube URL Here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
        </div>

        <div className="pt-2">
          <button
            className="btn btn-warning rounded-xl btn-sm "
            disabled={btnstatus}
            onClick={handleDownload}
          >
            {reset}
          </button>
        </div>
      </div>
      <div className="mt-5">
        {error && <p className="text-red-600 font-bold text-lg">{error}</p>}
        <p className="text-sm">{videoInfo?.title}</p>
        {videoInfo?.formats.map((format, index) => (
          <div className="pt-5" key={index}>
            <p>Size: {format.qualityLabel}</p>
            <p>Quality: {format.quality}</p>
            <a
              className="btn btn-info mt-2 btn-sm"
              onClick={() => {
                setVideoInfo(null);
                setstatus(false);
                setreset('Process');
                setUrl("");
              }}
              href={format.url as string}
              target="_blank"
              download={format.filename}
            >
              Download
            </a>
          </div>
        ))}
      </div>
      <div className="pt-10">
        <p ><span className="text-yellow-400">&copy;</span> 2025 <span> </span> Design By <span className="text-info font-bold">Tulus-Dev</span></p>
      </div>
    </div>
  );
}
