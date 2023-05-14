import {useState, useEffect} from 'react'
import ProgressBar from './components/ProgressBar/'
import './App.css'


const CircularProgressBar = () => {
  const [circleLoading, setCircleLoading] = useState(true)
  const [circleProgress, setCircleProgress] = useState(0)
  const circleLoadingDuration = 6500 

  useEffect(() => {
    let circleLoadingTimeout = setTimeout(() => {
      if (circleLoading >= 100) return
      setCircleProgress(circleProgress + 1)
    }, circleLoadingDuration/100)

    if (circleProgress === 100) {
      setCircleLoading(false)
    }

    return () => {
      clearTimeout(circleLoadingTimeout)
    }
  }, [circleProgress, circleLoading])


  return (
    <div className='hero-circle-container'>
      {circleLoading ? (
        <ProgressBar progress={circleProgress} trackWidth={1} indicatorWidth={2} hideLabel={true}/>
      ) : (
        <div
          
        >
          <h2 className='hero-text'>CHANGE IS THE ONLY CONSTANT</h2>
        </div>
      )}
    </div>
  )   
}

export default CircularProgressBar
