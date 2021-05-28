import './App.css';
import Row from './Row';
import requests from "./request"
import Banner from './Banner'
import Nav from './Nav'

function App() {
  return (
    <div className="App">
      <Nav />
      <Banner />
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
      <Row title="Romantic Movies" fetchUrl={requests.fetchRomanticMovies}/>
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
    </div>
  );
}

export default App;
