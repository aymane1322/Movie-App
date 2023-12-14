import "../toWatch/toWatch.css"
import ToWatch from "../component/ToWatch"

function page() {
  
  return (
    <div className='container'>
      <h1>To Watched</h1>
      <div className='toWatchMoviesDiv'>
        <ToWatch/>
      </div>
    </div>
  )
}

export default page