import { useState, useCallback, useEffect, useRef } from "react";

export default function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMN0PQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}[]~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  
  useEffect(()=>{
    passwordGenerator()
  },[length, numberAllowed,charAllowed,setPassword])
  
  let passwordRef = useRef(null)
  const copyPassward = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
  },[Password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-1 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Password}
            className="outline-none w-full py-1 px-3"
            readOnly
            placeholder="Password"
            ref={passwordRef}
          />
          <button className="outline-none bg-blue-700
           text-white px-3 py-0.5 shrink-0" onClick={copyPassward}>
            Copy
          </button>
        </div>
        <div className="flex items-center gap-x-1">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={0}
              max={24}
              value={length}
              id="length"
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="number"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((pre) => !pre);
              }}
            />
            <label htmlFor="number">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="character"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="character">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}
