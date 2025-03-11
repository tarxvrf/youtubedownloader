import { NextApiRequest } from "next";
import { NextApiResponse } from "next";
import ytdl from '@distube/ytdl-core';
import { Middleware } from "./middleware";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
   Middleware(req,res)
    if (req.method === 'POST') {
        const { url } = req.body;
        
        if (!url) {
          return res.status(400).json({ error: 'URL is required' });
        }
    
        try {
          const info = await ytdl.getInfo(url)
          const formats = ytdl.filterFormats(info.formats,'videoandaudio')


          if (!formats) {
            return res.status(404).json({ error: 'No valid formats found for this video' });
          }
    res.status(200).json({
            title: info.videoDetails.title,
            formats: formats, // Mengirimkan format yang valid
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to fetch video info' });
        }
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }



}