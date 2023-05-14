import { useEffect, useState, useRef,Suspense } from 'react'
import logo from "./assets/download.png"
import axios from "axios"
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

import './App.css'
import CircularProgressBar from './CircularProgress';
import { WhiteDots } from './components/WhiteDots';
import { Canvas, extend } from '@react-three/fiber';

function Rig({ children }) {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (state.mouse.x * Math.PI) / 10, 2)
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, (state.mouse.y * Math.PI) / 10, 2)
  })
  return <group ref={ref}>{children}</group>
}


function App() {
  const [navOpen,setNavOpen] = useState(false)
  const [works,setWorks] = useState([])
  const [loading,setLoading] = useState(false)
  const [progress,setProgress] = useState(0)
  const [fullSiteLoading,setFullSiteLoading] = useState(true)

  const fetch =  async () => {
    
    let newItems = []
    try {
      setLoading(true)
      let result = await axios.get('https://www.wunderfauks.com/wp/wp-json/acf/v3/work', {
        onDownloadProgress: progressEvent => {
          const currentProgress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(currentProgress);
        }
      })
      
    const data = result.data
    newItems = data
    console.log(data)
    setWorks([...works, ...newItems])
    setLoading(false)
    } catch (error) {
      console.log(error)
    }
    
  }
  
  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    if (scrollTop + clientHeight >= scrollHeight) {
      fetch()
    }
  }

  
  
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [works])

  

  useEffect(() => {
    fetch()
    const timer = setTimeout(() => setFullSiteLoading(false), 3000);
    return () => clearTimeout(timer);
   
  },[])


  return (
    <>    
      <div className='nav-bar-container'>
        <div className={navOpen ? 'nav-bar-background hide' : 'nav-bar-background'}></div>
        <div className='container'>
          <div className='nav-bar'>
            <img src={logo} alt='logo' className={navOpen ? 'hide' : ''}/>

            <div onClick={() => setNavOpen(!navOpen)} className={navOpen ? "burger ten activated" : "burger ten"}>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        
      </div>

      {fullSiteLoading ? 
      <div className="loading-bar">
        <div className="progress-bar"></div>
      </div> : 
      <>
      <section className='hero-section'>
        
        <Canvas
        className='particles-background'
        pixelRatio={window.devicePixelRatio}
        camera={{ fov: 100, position: [0, 0, 30] }}
        onCreated={({ gl, size, camera }) => {
          if (size.width < 600) {
            camera.position.z = 10;
          }
          gl.setClearColor(new THREE.Color('#1c1b1d'));
        }}>
        <Suspense fallback={null}>
          <>
            <Rig>
            <pointLight distance={50} intensity={2} color="white" />
            <group>
             
              <WhiteDots count={300} />
              
            </group>
            </Rig>
          </>
        </Suspense>
        </Canvas>

        <CircularProgressBar/>
        
        
        <p className='slogans slogan1'>HI ,</p>
        <p  className='slogans slogan2'>We ARE AN INTEGRATED CREATIVE AGENCY</p>
        <p  className='slogans slogan3'>SINCE 2010</p>
        <p  className='slogans slogan4'>TRANSFORMING AND GROWING WITH OUR CLIENTS</p>
        <p  className='slogans slogan5'>THROUGH OUR BELIEF</p>

        <div className='container home-section-footer'>
          <p className='copyright'>© 2023</p>
          <div className='works-indicator'>
            <p>Works</p>
            <Icon icon="material-symbols:arrow-back-ios-new-rounded" className='works-indicator-icon'/>
          </div>
          <p className='agency'>An Integrated Creative Agency</p>
        </div>
      
      </section>
      <div className='works-container'>
      {
        loading && works.length === 0 ? <p className='loading-text'>{progress}% Loading...</p> :
        works.map((item,index) => (
          <div key={index} className='work-container'>
              <img src={item.acf.image.url} alt='work-img'/>
              <div className='work-details'>
                <p className='work-index'>{(index+1) <= 9 ? `0${index+1}` : (index+1)}</p>
                <p className='work-title'>{item.acf.client}</p>
                <p className='work-category'>{item.acf.work_category}</p>
              </div>
          </div>
        ))
      }
      </div>
      </>
      }
      

      <div className={navOpen ? 'menu-container clipOpen' : 'menu-container'}>
        <div className='container'>
          <AnimatePresence>
            {
              navOpen && <motion.p key= "about title"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className='about-title'>About</motion.p>
            }
            
          </AnimatePresence>
          <div className='about-container'>
            <div className='about-text-container'>
              <AnimatePresence>
                {
                  navOpen && <motion.p key= "about1"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  
                  exit={{ opacity: 0, y: 100 }}>Wunderfauks is an integrated creative agency focusing on new and innovative experiences. From the likes of creative expression to a campaign execution, communication and creative implementation, Wunderfauks provides tailored bulls-eye solutions that focus on results over activities.</motion.p>
                }
              </AnimatePresence>
              <AnimatePresence>
                {
                  navOpen && <motion.p key= "about2"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{duration:0.7}}
                  exit={{ opacity: 0, y: 100 }}>With digital as our strong suit, we have a dynamic team comprising of multi-disciplinary individuals with their own think tanks of interesting ideas and concepts to suit any need, logic and aspiration.</motion.p>
                }
              </AnimatePresence>
            </div>

            <div className='about-links-container'>
            <AnimatePresence>
                {
                  navOpen &&
                  <motion.div key= "socials"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{duration:0.6}}
                  exit={{ opacity: 0, x: 100 }} className='about-links-icons-container'>
                      <Icon icon="ri:facebook-fill" className='social-icon'/>
                      <Icon icon="mdi:instagram" className='social-icon'/>
                      <Icon icon="ri:linkedin-fill" className='social-icon'/>
                  </motion.div>
                }
              </AnimatePresence>
              <AnimatePresence>
                {
                  navOpen &&
                  <motion.div key= "links"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{duration:0.7}}
                  exit={{ opacity: 0, y: 100 }} className='about-links'>
                    <a href='#'>WORK</a>
                    <a href='#'>SERVICES</a>
                    <a href='#'>APPROACH</a>
                    <a href='#'>CAREERS</a>
                    <a href='#'>CONTACT</a>
                  </motion.div>
                }
                </AnimatePresence>

            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default App
