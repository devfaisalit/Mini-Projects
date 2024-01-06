import React from 'react'
import TextExtractor from './components/image text .js'
import PngToJpg from './components/Png to Jpg.js'
function App() {
  return (
    <div className=' flex flex-col justify-center items-center h-[100vh]'>
      {/* <PngToJpg/> */}
      <h1>Extract Text from Image</h1>
      <TextExtractor/>
    </div>
  )
}

export default App
