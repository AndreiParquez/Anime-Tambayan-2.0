import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import { motion } from 'framer-motion';
import img from '../assets/hxh.png';
import cover from '../assets/cover.png';
import Loader from './loader';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { FaHashtag } from 'react-icons/fa';
//import { set } from 'video.js/dist/types/tech/middleware';

const ProxyApi = "https://proxy.jackparquez1.workers.dev/?=";
const IndexApi = "/home";
const recentapi = "/recent/";
const upcommingapi = "/upcoming/";

const AvailableServers = ['https://anime.jackparquez1.workers.dev'];
function getApiServer() {
    return AvailableServers[Math.floor(Math.random() * AvailableServers.length)];
}

async function getJson(path, errCount = 0) {
    const ApiServer = getApiServer();
    let url = ApiServer + path;

    if (errCount > 5) {
        throw new Error(`Too many errors while fetching ${url}`);
    }

    if (errCount > 0) {
        url = ProxyApi + url;
    }

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (errors) {
        console.error(errors);
        return getJson(path, errCount + 1);
    }
}

function Home() {
    const [popularAnimes, setPopularAnimes] = useState([]);
    const [recentAnimes, setRecentAnimes] = useState([]);
    const [upcommingAnimes, setUpcommingAnimes] = useState([]);
    const [page, setPage] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [aniList, setAniList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = (await getJson(IndexApi))["results"];
                const AnilistTrending = (data["anilistTrending"]);
                setAniList(AnilistTrending);
                
                const gogoanimePopular = shuffle(data["gogoPopular"]);
                setPopularAnimes(gogoanimePopular);
                const recentData = (await getJson(recentapi + 1))["results"];
                setRecentAnimes(recentData);
                const upcommingData = (await getJson(upcommingapi + 1))["results"];
                setUpcommingAnimes(upcommingData);
                console.log("Fetched data:", data);
            } catch (error) {
                console.error(`Failed to fetch data: ${error}`);
            }
        }

        fetchData();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;
        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    async function handleScroll() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if ((scrollPosition + (3 * windowHeight)) >= documentHeight) {
            loadAnimes();
        }
    }

    async function loadAnimes() {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const data = (await getJson(recentapi + page))["results"];
            setRecentAnimes(prev => [...prev, ...data]);
            setPage(prev => prev + 1);
        } catch (error) {
            console.error(`Failed to load recent animes: ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    const textVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
    };

    const imageVariants = {
        waving: {
            rotate: [0, 15, -15, 15, -15, 0],
            transition: { repeat: Infinity, duration: 1, ease: 'easeInOut', repeatDelay: 2 },
        },
    };

    return (
        <>
        
        <div className="App bg-zinc-900 md:px-80  text-white">
        <Navbar />
            
            <div className="relative flex items-center pt-16" style={{ backgroundImage: `url(${cover})`, backgroundSize: 'cover', height: '300px' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                <div className="relative flex items-center w-full justify-center">
                    <div>
                        <motion.h1
                            className="text-4xl font-custom text-white z-10"
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                        >
                            Anime Tambayan
                        </motion.h1>
                        <motion.p
                            className="text-violet-300 font-extrabold tracking-widest text-center"
                            initial="hidden"
                            animate="visible"
                            variants={textVariants}
                            transition={{ delay: 0.5 }}
                        >
                            Watch Anime with no ads!
                        </motion.p>
                    </div>
                    <motion.img
                        src={img}
                        alt="logo"
                        className="h-32 z-10"
                        variants={imageVariants}
                        animate="waving"
                    />
                </div>
            </div>

             {/* Most Popular Carousel */}
             <section className="p-4">
            <div>
        <h2 id="latest" className="text-lg font-semibold mb-4 font-custom tracking-widest">Most <span className='text-violet-300'>Popular</span></h2>
        <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="mySwiper"
        >
            {aniList.map((anime, index) => (
                <SwiperSlide key={index}>
                    <Link to={`/anime/${anime.title.userPreferred}`} className="block">
                        <motion.div
                            className="relative bg-zinc-900 mb-9   rounded overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 2, delay: index * 0.1 }}
                            style={{ backgroundImage: `url(${anime.bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        >
                            <div className="z-0" style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `linear-gradient(to right, ${anime.coverImage.color}, rgba(0, 0, 0, 0.5))`,                                zIndex: 1
                            }}></div>
                            <div className=" z-10 relative flex space-x-2 items-center p-2">
                                <div className="w-1/2">
                                    <img className="  h-full  object-cover shadow-lg" src={anime.coverImage.large} alt={anime.title.userPreferred} />
                                    
                                </div>
                                <div className="w-1/2  text-white">
                                    <p className=" font-extrabold   drop-shadow truncate-2-lines">{anime.title.english}</p>
                                    
                                    <div className="flex space-x-2  items-center drop-shadow text-yellow-400">
                                        <div className="text-sm font-custom items-center flex"><FaHashtag className='size-2 font-bold' /> {index + 1}</div>
                                        <div className="p-1 rounded-lg text-sm font-custom font-bold tracking-wider text-blue-300">EP {anime.episodes}</div>
                                        <div className="p-1 rounded-lg text-sm font-custom font-bold tracking-wider text-violet-300">
                                            {anime.format}
                                        </div>
                                    </div>
                                    <div className="overflow-y-auto h-40">
                                    <p className="text-sm mt-2 indent-7">{anime.description.replace(/<[^>]*>/g, '')}</p>

                                    </div>
                                    <button className="mt-2 shadow-mdw p-2 w-full flex  justify-center items-center font-bold text-white hover:bg-white hover:text-violet-600 transition-colors duration-300 ease-in-out transform "
                                    style={{
                                        background: anime.coverImage.color,
                                    }}>
                                        <span className='drop-shadow-sm font-custom tracking-wider'>Watch Now</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
</section>



            {/* Most Popular Carousel */}
            <section className="p-4">
                <div>
                    <h2 id="latest" className="text-lg font-semibold mb-4 font-custom tracking-widest">Trending <span className='text-yellow-300'>Now</span></h2>
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={20}
                        slidesPerView={2}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        breakpoints={{
                            1024: {
                                slidesPerView: 4,
                            },
                            600: {
                                slidesPerView: 1,
                            },
                            480: {
                                slidesPerView: 1,
                            },
                        }}
                        className="mySwiper"
                    >
                        {popularAnimes.map((anime, index) => (
                            <SwiperSlide key={index}>
                                <Link to={`/anime/${anime.id}`} className="block">
                                    <motion.div
                                        className="poster bg-zinc-900 mb-4 overflow-hidden"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 2, delay: index * 0.1 }}
                                    >
                                        <div id="shadow2" className="shadow">
                                            <img className="lzy_img w-full h-64 object-cover" src={anime.image} alt={anime.title} />
                                        </div>
                                        <div className="la-details p-2 text-white">
                                            <div className="items-center">
                                                <p className="text-xs font-semibold ">{anime.title}</p>
                                                <div className="flex justify-between items-center text-gray-400">
                                                    <div className="text-xs font-custom items-center flex"><FaHashtag className='size-2 font-bold' /> {index + 1}</div>
                                                    <div className="p-1 rounded-lg text-xs font-custom font-bold tracking-wider text-violet-300">
                                                        {anime.title.toLowerCase().includes("dub") ? "DUB" : "SUB"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <section className="p-4">
                <div>
                    <h2 id="latest" className="text-lg font-custom tracking-widest font-semibold mb-4">Upcoming <span className='text-green-300'>Releases</span></h2>
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={20}
                        slidesPerView={2}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        breakpoints={{
                            1024: {
                                slidesPerView: 4,
                            },
                            600: {
                                slidesPerView: 1,
                            },
                            480: {
                                slidesPerView: 1,
                            },
                        }}
                        className="mySwiper"
                    >
                        {upcommingAnimes.map((anime, index) => (
                            <SwiperSlide key={index}>
                                <Link to={`/anime/${anime.media.title.userPreferred}`} className="block">
                                    <motion.div
                                        className="poster bg-zinc-900  mb-4 overflow-hidden"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 2, delay: index * 0.1 }}
                                        
                                    >
                                        <div id="shadow2" className="shadow">
                                            <img className="lzy_img w-full object-cover  h-64 " src={anime.media.coverImage.large} alt={anime.media.title.userPreferred} />
                                        </div>
                                        <div className="la-details p-2 text-white">
                                            <div className="items-center">
                                                <p className="text-xs  font-bold truncate-2-lines" style={{ color: anime.media.coverImage.color }}>{anime.media.title.userPreferred}</p>
                                                <div className="flex justify-between items-center text-gray-400">
                                                    <div className="text-xs font-custom">EP {anime.episode}</div>
                                                    <div className="text-xs font-custom text-violet-300">Date {new Date(anime.airingAt * 1000).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* Recent Releases Grid */}
            <section className="p-4">
                <div>
                    <h2 id="latest" className="text-lg font-custom tracking-widest font-semibold mb-4">Recent <span className='text-blue-300'>Releases</span></h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {recentAnimes.map((anime, index) => (
                            <Link to={`/anime/${anime.id}`} key={index} className="block">
                                <motion.div
                                    className="poster bg-zinc-900 overflow-hidden"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 2, delay: index * 0.1 }}
                                >
                                    <div id="shadow2" className="shadow">
                                        <img className="lzy_img w-full h-64 object-cover" src={anime.image} alt={anime.title} />
                                    </div>
                                    <div className="la-details p-2 text-white">
                                        <div className="items-center">
                                            <p className="text-xs font-semibold">{anime.title}</p>
                                            <div className="flex justify-between items-center text-gray-400">
                                                <div className="text-xs font-custom">EP {anime.episode.split(" ")[1]}</div>
                                                <div className="p-1 font-custom rounded-lg text-xs font-bold text-red-500 tracking-wider">
                                                    {anime.title.toLowerCase().includes("dub") ? "DUB" : "SUB"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Releases Carousel */}
            

            {isLoading && (
                <div id="load" className="p-4 text-center">
                    <Loader />
                </div>
            )}
            <footer className="p-4 text-center">
                <div>
                    {/* Footer Content */}
                </div>
            </footer>
        </div>
        </>
    );
}

export default Home;
