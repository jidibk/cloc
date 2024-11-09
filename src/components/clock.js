import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './clock.css'

import store from '../redux/store'


function Clock(props)
     {
    // const breakTime = useSelector(state => state.breakTime);
    // const sessionTime = useSelector(state => state.sessionTime);

    const [breakTime, setBreakTime] = useState(5);
    const [sessionTime, setSessionTime] = useState(25);

    const [minutes, setMinutes] = useState(sessionTime); // Adjust the starting minutes as needed
    const [seconds, setSeconds] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [breakStatus, setBreak] = useState(false);
    
    // const dispatch = useDispatch()

    
    
    
    const increase_S = () => {
        if (playing === false && sessionTime < 60) {
          setSessionTime(sessionTime+1);
          if (breakStatus === false){
            setMinutes(sessionTime+1);
            setSeconds(0);
          }
        }
    };
    const decrease_S = () => {
        if (playing === false && sessionTime > 1) {
          setSessionTime(sessionTime-1);
          if (breakStatus === false){
            setMinutes(sessionTime-1);
            setSeconds(0);
          }
        }
    };

    const increase_B = () => {
      if (playing === false && breakTime < 60) {
        setBreakTime(breakTime+1);
        if (breakStatus === true){
          setMinutes(breakTime+1);
          setSeconds(0);
        }
      }
  };
  const decrease_B = () => {
      if (playing === false && breakTime > 1) {
        setBreakTime(breakTime-1);
        if (breakStatus === true){
          setMinutes(breakTime-1);
          setSeconds(0);
        }
      }
  };



    let intervalId;
    useEffect(() => {        
      if (playing) {
        intervalId = setInterval(() => {
            if (minutes > 0 && seconds === 0) {
              setMinutes(minutes - 1);
              setSeconds(59);
            } else if (seconds > 0) {
              setSeconds(seconds - 1);
            } else {
              clearInterval(intervalId);
              setPlaying(false)
            }
          }, 1000);
      } 
      else if (breakStatus === false && minutes === 0 && seconds === 0) {
        setMinutes(breakTime);
        setPlaying(true);
        setBreak(true);
      }
      else if (breakStatus === true && minutes === 0 && seconds === 0) {
        setMinutes(sessionTime);
        setPlaying(true);
        setBreak(false);
      }
      else {
        clearInterval(intervalId);
      }
    
      return () => clearInterval(intervalId);
    }, [minutes, playing, seconds]);



    const togglePause = () => {
      setPlaying(!playing);
      
    };
    const reset = () =>{
      setPlaying(false);
      setSessionTime(25);
      setBreakTime(5);
      setMinutes(25);
      setSeconds(0);
      setBreak(false);
    };





//render the component
    
  return (
    <div>
      <div className=' parent'>   
        <div id='break-label' className='time child float-left'>
          <div>
            <div>
              <h3>
                  Break length
              </h3>
              <h3 id="break-length">
                  {breakTime} 
              </h3>
            </div>         
            <div className=''>
                {/* <button id='break-decrement' className='btn btn-primary float-right' onClick={() => dispatch({ type: 'INCREMENT', payload: 1 })}><i className="fas fa-arrow-up"></i></button>
                <button id='break-increment' className='btn btn-primary float-left' onClick={() => dispatch({ type: 'DECREMENT', payload: 1 })}><i className="fa fa-arrow-down"></i></button> */}
                <button id="break-increment" className='btn btn-primary float-right' onClick={increase_B}><i className="fas fa-arrow-up"></i></button>
                <button id='break-decrement' className='btn btn-primary float-left' onClick={decrease_B}><i className="fa fa-arrow-down"></i></button>
            
            </div>
          </div>
        </div>            
        <div id='session-label' className='time child float-right'>
          <div>
            <div>
              <h3>
                  Session length
              </h3>
              <h3 id="session-length">
                  {sessionTime}
              </h3>
            </div>
            <div className=''>
              <button id='session-increment' className='btn btn-primary float-right' onClick={increase_S}><i className="fas fa-arrow-up"></i></button>
              <button id='session-decrement' className='btn btn-primary float-left' onClick={decrease_S}><i className="fa fa-arrow-down"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div id='mainClass' className='wrapper'>
        <div  className='quote-box'>
          <div className='text'>
            <h3 id='timer-label'>
              {breakStatus ? 'Break' : 'Session'}
            </h3>
            <h3 id='time-left'>
              {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h3>
          </div> 
          <div className='buttons'>
            <button id='reset' className='btn btn-primary float-right' onClick={reset}><i className="fa fa-repeat">reset</i></button>
            <button id='start_stop' className='btn btn-primary float-left' onClick={togglePause}><i className="fa-play-pause">play</i></button>
          </div>
        </div>
        <div className='footer'>by #JIDIBK</div>
      </div>
    </div>
  )
}

export default Clock