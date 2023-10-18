import { useCallback, useEffect, useState,useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [chars, setChars] = useState(false);

  const [pass, setPass] = useState("");
  
  var pp="";
const inputV = useRef(null);
  
  var changepass = useCallback(() => {
    let news=0;
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (chars) str += "!@#$%^&*?/";
    
    for (let i = 1; i <= length; i++) {
      console.log( " length => "+ length + " i= " + i);
      news = Math.floor(Math.random() * str.length + 1);
       pp += str.charAt(news);  
    }  
    setPass(pp);
  },[length, number, chars,setPass]);

  
  const copy = () => {
    inputV.current?.select();
    window.navigator.clipboard.writeText(pass);
   };

  useEffect(() => {
    console.log('start')
    changepass();  
    console.log('useEffect')
  },[length, number, chars,changepass]);
  return (
    <>
      <div className="bg-white w-2/4 m-auto p-10 relative flex flex-col items-center justify-center rounded-3xl">
        <div className="w-3/4 h-12 border shadow-md rounded-md overflow-hidden">
          <input
            type="text"
            className="w-3/4 p-2 text-xl font-bold"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            readOnly
            ref={inputV}
          />
          <button
            className="w-1/4 bg-blue-700 h-full text-white text-xl pointer"
            onClick={copy}
          >
            copy
          </button>
        </div>
        <div className="options flex gap-2">
          <input
           type="range" 
           name="range" 
           id="range" 
           min={6}
           max={10}
          //  length= {length}
          value={length}
          onChange={(e)=>{setLength(e.target.value)}}
           />
          <div>{length} </div>
          
          <input
            type="checkbox"
            name="number"
            id="number"
            defaultChecked={number}
            onChange={()=>{
                setNumber((prev)=>!prev)
            }}
          />
          <label htmlFor="number">Numbers</label>
          <input 
          type="checkbox" 
          name="chars" 
          id="chars" 
          defaultChecked={chars} 
          onChange={()=>{setChars((prev) => !prev )}}
          />
          <label htmlFor="chars">Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
