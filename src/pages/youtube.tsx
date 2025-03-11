import { useEffect, useRef, useState } from "react";
import { FaYoutube } from "react-icons/fa";



interface VideoInfo {
  title: string;
  formats: { [key: string]: any }[]; // or more specific type for formats
}
export default function YouTube() {
  const [url, setUrl] = useState('');
  const [btnstatus,setstatus]=useState(false)
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [error, setError] = useState(null);
 

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/loaderfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch video info');
      }

      const data = await response.json();
      setVideoInfo(data);
  
      if(btnstatus === false){
        setstatus(true)
      }
     
      
      
      
      setError(null);
    } catch (error) {
      setError('Please Input YouTube Url Video' as any);
      setVideoInfo(null);
    }

  };

  
  return (
    <div className="flex flex-col justify-center items-center h-[700px] gap-10 ">
     <h1 className="text-5xl flex items-center gap-2"><FaYoutube className="text-red-500" /><span className="text-red-500 font-bold">YouTube</span> Video Downloader</h1>
      <h1 className="text-xl mt-10">Please Input YouTube Url Video</h1>
      <div className="flex gap-5 w-full justify-center ">       
      <label className="input border border-amber-50 rounded-md bg-transparent ">        
      <input
        type="text"
        placeholder="Enter YouTube URL Here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      </label></div>
      <button className="btn btn-warning" disabled={btnstatus} onClick={handleDownload}>Process</button>

      {error && <p className="text-red-600 font-bold text-lg">{error}</p>}

      <p>{videoInfo?.title}</p>

      {videoInfo?.formats.map((format, index) => (
        <div  key={index}>          
          <p>Size: {format.qualityLabel}</p>
          <p>Quality: {format.quality}</p>          
          <a  
            className="btn btn-info mt-7"
            onClick={(e)=>{setVideoInfo(null);setstatus(false);setUrl('')}}            
            href={format.url}
            target="_blank"
            download={format.filename}>  
            Download          
          </a>
         
        </div>
      ))}
    </div>
  );
}