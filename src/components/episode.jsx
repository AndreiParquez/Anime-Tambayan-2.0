import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from './videoplayer';
import Navbar from './navbar';
import img from '../assets/hxh.png';
import { IoIosWarning } from "react-icons/io";
import Loader from './loader';
import { motion } from 'framer-motion';

const ProxyApi = "https://proxy.jackparquez1.workers.dev/?=";
const episodeapi = "/episode/";

const AvailableServers = ['https://anime.jackparquez1.workers.dev'];

function getApiServer() {
  return AvailableServers[Math.floor(Math.random() * AvailableServers.length)];
}

async function getJson(path, errCount = 0) {
  const ApiServer = getApiServer();
  let url = ApiServer + path;

  if (errCount > 2) {
    throw new Error(`Too many errors while fetching ${url}`);
  }

  if (errCount > 0) {
    url = ProxyApi + url;
  }

  console.log(`Fetching data from: ${url}`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok ${response.statusText}`);
    }
    const data = await response.json();
    console.log(`Fetched data:`, data);
    return data;
  } catch (errors) {
    console.error(`Error fetching ${url}:`, errors);
    return getJson(path, errCount + 1);
  }
}

const EpisodePage = () => {
  const { episode_id } = useParams();
  const [episodeData, setEpisodeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEpisodeData = async () => {
      try {
        const episodeResponse = await getJson(episodeapi + episode_id);
        console.log('Episode data:', episodeResponse);

        if (episodeResponse?.results) {
          setEpisodeData(episodeResponse.results);
        } else {
          throw new Error("Failed to fetch episode data");
        }
      } catch (err) {
        console.error(`Error loading data:`, err);
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (episode_id) {
      loadEpisodeData();
    } else {
      setError("Invalid episode ID");
      setLoading(false);
    }
  }, [episode_id]);

  const handleEpisodeClick = (episodeId) => {
    navigate(`/episode/${id}/${episodeId}`);
  };

  if (loading) return <div><Loader /></div>;

  return (
    <>
      <Navbar />
      <div className='bg-zinc-900 pt-16'>
        {error ? (
          <div className='flex flex-col justify-center py-36 items-center'>
            <motion.img
              src={img}
              alt="Error"
              className="h-28"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            />
            <IoIosWarning className='text-6xl mx-auto text-violet-400' />
            <p className='text-white font-bold text-center'>
              <span>An error occurred.</span>
              <span className='text-violet-500'> Please try again later.</span>
            </p>
          </div>
        ) : episodeData ? (
          <>
            {episodeData.stream && episodeData.stream.sources && episodeData.stream.sources.length > 0 ? (
              <VideoPlayer source={episodeData.stream.sources[0].file} id={episode_id} />
            ) : (
              <p className='text-white'>No video source available</p>
            )}
            <div className="px-auto text-center">
              <p className='text-violet-400'>You are watching...</p>
              <p className='text-base font-bold text-gray-300'>{episodeData.name}</p>
            </div>
            {episodeData.episodes && !isNaN(parseInt(episodeData.episodes)) ? (
              <section id="watch">
                <div className="episode-container px-4 py-2">
                  <h1 className="text-base font-bold text-gray-300">Episodes:</h1>
                  <div className="font-bold mt-1 grid grid-cols-6 px-3 gap-2 py-2 rounded bg-violet-600 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
                    {Array.from({ length: parseInt(episodeData.episodes) }, (_, index) => (
                      <button
                        key={index}
                        className="bg-zinc-800 w-12 h-12 text-white rounded flex items-center justify-center"
                        onClick={() => handleEpisodeClick(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            ) : (
              <div className='text-white'>No episodes available</div>
            )}
          </>
        ) : (
          <div className='text-white'>No episode data available</div>
        )}
      </div>
    </>
  );
};

export default EpisodePage;
