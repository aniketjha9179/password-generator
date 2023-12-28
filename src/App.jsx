import React, { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(15);
  const [numberAllowed, setNumberAlowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // ref hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";

    if (charAllowed) str += "!@#$%^&*_-+=[]{}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();

    passwordRef.current?.setSelectionRange(0, 99);

    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div
        className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 text-orange-500
    bg-gray-500  mt-52"
      >
        <h1
          style={{
            fontSize: 19,
            color: "white",
            fontFamily: "monospace",

            alignItems: "center",
            justifyItems: "center",
            marginBottom: 10,
            marginLeft: 50,
            letterSpacing: "4px",
          }}
        >
          Password Generator
        </h1>
        <div className="flex shadow-sm rounded-sm overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            onClick={() => {}}
            className="outline-none w-full py-1 px-3 rounded-md"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="mx-5 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-xl p-2 text-white "
            onClick={copyPasswordToClipBoard}
            
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAlowed((prev) => !prev);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
