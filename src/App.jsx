import { useState, useCallback, useEffect } from 'react'
import { Copy, ShieldCheck } from 'lucide-react'
import './App.css'

function App() {

  const [length, setlength] = useState(8)
  const [numberallo, setnumberallo] = useState(false)
  const [chars, setchars] = useState(false)
  const [password, setpassword] = useState("")

  const passwordGenerator = useCallback(() => {

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberallo) str += "0123456789"
    if (chars) str += "@#!$%&*_-?~"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setpassword(pass)

  }, [length, numberallo, chars])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberallo, chars, passwordGenerator])

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-6">

        <div className="flex items-center justify-center gap-2 mb-6">
          <ShieldCheck className="text-orange-400" size={30} />
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Password Generator
          </h1>
        </div>

        <div className="flex overflow-hidden rounded-2xl shadow-lg mb-6 border border-gray-700">

          <input
            type="text"
            value={password}
            className="w-full bg-white px-4 py-3 text-black outline-none text-lg font-medium"
            placeholder="Password"
            readOnly
          />

          <button
            onClick={copyPassword}
            className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-5 text-white flex items-center justify-center"
          >
            <Copy size={20} />
          </button>

        </div>

        <button
          onClick={passwordGenerator}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white py-3 rounded-2xl text-lg font-semibold shadow-lg mb-6"
        >
          Generate Password
        </button>

        <div className="space-y-5 text-white">

          <div>
            <div className="flex justify-between mb-2 text-sm">
              <label>Password Length</label>
              <span className="text-orange-400 font-semibold">{length}</span>
            </div>

            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="w-full cursor-pointer"
              onChange={(e) => {
                setlength(Number(e.target.value))
              }}
            />
          </div>

          <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl border border-gray-700">
            <label htmlFor="numberInput" className="text-base">
              Include Numbers
            </label>

            <input
              type="checkbox"
              defaultChecked={numberallo}
              id="numberInput"
              className="w-5 h-5 cursor-pointer"
              onChange={() => {
                setnumberallo((prev) => !prev)
              }}
            />
          </div>

          <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl border border-gray-700">
            <label htmlFor="charsInput" className="text-base">
              Include Special Characters
            </label>

            <input
              type="checkbox"
              defaultChecked={chars}
              id="charsInput"
              className="w-5 h-5 cursor-pointer"
              onChange={() => {
                setchars((prev) => !prev)
              }}
            />
          </div>

        </div>

      </div>

    </div>
  )
}

export default App
