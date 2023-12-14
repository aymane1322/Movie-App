import "../toWatch/toWatch.css"
import Already from "../component/Already"
function page() {
  
  return (
    <div className='container'>
      <h1>Already Watched</h1>
      <div className='toWatchMoviesDiv'>
        <Already/>
      </div>
    </div>
  )
}

export default page