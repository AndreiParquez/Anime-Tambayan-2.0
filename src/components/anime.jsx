import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import img from '../assets/hxh.jpg';
import { HiPlay } from "react-icons/hi2";
import Navbar from './navbar';
import Loader from './loader';

const ProxyApi = "https://proxy.jackparquez1.workers.dev/?=";
const animeapi = "/anime/";
const AvailableServers = ['https://anime1.jackparquez1.workers.dev'];

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

function AnimePage() {
  const { id } = useParams();
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [episodeList, setEpisodeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      console.log(`Loading data for anime ID: ${id}`);
      try {
        const data = await getJson(animeapi + id);

        if (data && data.results) {
          const anime = data.results;

          setAnimeData({
            title: anime.name || anime.title?.userPreferred || "Unknown",
            image: anime.image || anime.coverImage?.large || "",
            lang: anime.episodes ? `EP ${anime.episodes.length || 0}` : "",
            type: anime.type || anime.format || "Unknown",
            synopsis: anime.plot_summary || anime.description || "No description available",
            other: anime.other_name || "Unknown",
            total: anime.episodes ? `EP ${anime.episodes.length || 0}` : "Unknown",
            year: anime.released || anime.seasonYear || "Unknown",
            status: anime.status || "Unknown",
            genres: anime.genre ? anime.genre.split(",") : anime.genres || ["Unknown"],
            episodes: anime.episodes || []
          });
        } else {
          throw new Error("No data returned");
        }
        setLoading(false);
      } catch (err) {
        console.error(`Error loading data:`, err);
        setError(err.message || "An unexpected error occurred");
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  const handleEpisodeClick = (episodeId) => {
    navigate(`/episode/${id}/${episodeId}`);
  };

  const handleWatchNow = () => {
    if (animeData && animeData.episodes.length > 0) {
      handleEpisodeClick(animeData.episodes[0][1]);
    }
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <div className="error-page">
        <h6>Oops! Something Went Wrong</h6>
        <p>We're sorry, but something went wrong. Try refreshing the page or come back later.</p>
        <p>If the issue persists, contact our <a href="https://github.com/TechShreyash/AnimeDexLite/issues/new">support team</a>.</p>
        <p className="error-description">{error}</p>
      </div>
    );
  }

  if (!animeData) {
    return (
      <div className="error-page">
        <p>No anime data available.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar/>
      <div className="main-content bg-zinc-900 text-white">
        <section>
          <motion.div
            className="anime-container"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="anime row">
              <div className="relative w-full h-64">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${animeData.image})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900"></div>
                <div className="absolute bottom-0 left-0 z-10 p-4 w-full">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-white text-xl font-bold">{animeData.title}</h1>
                    <span className="text-[9px] font-semibold border px-1 rounded">HD</span>
                    <span className="text-xs tracking-widest font-bold text-gray-300">{animeData.lang}</span>
                  </div>
                  <div className="flex text-gray-300 space-x-2 ">
                    <span className="year">{animeData.type}</span>
                    <span className="">Genre: <span className='text-sm text-violet-300 ml-2 tracking-widest'>{animeData.genres.join(' | ')}</span></span>
                  </div>
                </div>
              </div>
              <div className="details col-6 px-3">
                <div className="mid" style={{ margin: '20px 0' }}>
                </div>
                <div className="mid">
                  <button onClick={handleWatchNow} className="rounded bg-violet-600 p-2 w-full flex justify-center items-center font-bold text-white hover:bg-white hover:text-violet-600 transition-colors duration-300 ease-in-out transform ">
                    <HiPlay className='size-5'/> <span>Watch Now</span>
                  </button>
                </div>
                <div className="text-gray-400 text-sm mt-2">
                  <p className=" text-base font-bold text-gray-300">Synopsis:</p>
                  <div className="mx-2 indent-4">{animeData.synopsis}</div>
                </div>
                <div className="grid grid-cols-2 my-3">
                  <div className="space-x-2">
                    <span className="item-head">Other Names:</span>
                    <span className="text-gray-400 text-sm">{animeData.other}</span>
                  </div>
                  <div className="space-x-2">
                    <span className="item-head">Episodes:</span>
                    <span className="text-gray-400 text-sm">{animeData.total}</span>
                  </div>
                  <div className="space-x-2">
                    <span className="item-head">Release Year:</span>
                    <span className="text-gray-400 text-sm">{animeData.year}</span>
                  </div>
                  <div className="space-x-2">
                    <span className="item-head">Type:</span>
                    <span className="text-gray-400 text-sm">{animeData.type}</span>
                  </div>
                  <div className="space-x-2">
                    <span className="item-head">Status:</span>
                    <span className="text-gray-400 text-sm">{animeData.status}</span>
                  </div>
                </div>
                <section id="watch">
                  <div className="episode-container">
                    <h1 className="text-base font-bold text-gray-300 ">Episodes:</h1>
                    <motion.div
                      className="font-bold mt-1 grid grid-cols-6 px-3 gap-2 py-2 rounded  sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {animeData.episodes.map((episode) => (
                        <button
                          key={episode[1]}
                          className="bg-zinc-700 w-12 h-12 text-white rounded flex items-center justify-center"
                          onClick={() => handleEpisodeClick(episode[1])}
                        >
                          {episode[0]}
                        </button>
                      ))}
                    </motion.div>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

export default AnimePage;
