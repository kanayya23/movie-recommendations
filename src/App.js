import styled from 'styled-components'
import axios from "axios";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";
import { useState } from "react"
const API_KEY = '52636270';


const Container = styled.div`
   display:flex;
   flex-direction:column;
`;

const Header = styled.div`
    display : flex;
    flex-direction:row;
    background-color:black;
    color:white;
    padding:10px;
    font-size:25px;
    font-weight:bold;
    box-shadow: 0 3px 10px 0 blue;
    justify-content:space-between;
    align-items: center;
`;

const AppName = styled.div`
      display:flex;
      flex-direction:row;
      align-items:center;
`;

const MovieImg = styled.img`
     width:40px;
     height:40px;
     margin:15px;
`

const SearchBox = styled.div`
     display:flex;
     flex-direction:row;
     background-color:white;
     padding:10px 10px;
     border-radius:6px;
     width:50%;
     margin-left:20px;
     align-items:center;
`;

const SearchIcon = styled.img`
      width:32px;
      height:32px;
`

const SearchInput = styled.input`
       color:black;
       font-size:16px;
       border:none;
       outline:none;
       margin-left:none;
`;

const MovieListContainer = styled.div`
    display : flex;
    flex-direction:row;
    flex-wrap:wrap;
    padding:30px;
    gap:25px;
    justify-content:space-evenly;
`

const Placeholder = styled.img`
     width:200px;
     height:200px;
     margin:150px;
     opacity:50%;
`

function App() {

   const [searchQuery, updateSearchQuery] = useState("");
   const [timeoutId, updateTimeoutId] = useState();
   const [movieList,updateMovieList] = useState([]);
   const [selectedMovie,onMovieSelect] = useState();

   const fetchData=async(searchString)=>{
    console.log(searchString);
      const response = await axios.get(`https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`)
       updateMovieList(response.data.Search);
    }


   const onTextChange = (event) =>{

        clearTimeout(timeoutId)
        updateSearchQuery(event.target.value);
        const timeout = setTimeout(()=>fetchData(event.target.value),500);
        updateTimeoutId(timeout);
   };
  return (
 <Container>
  <Header>
    <AppName>
      <MovieImg src="/watching-a-movie.png"/>
       Movie Recommendations
    </AppName>
    <SearchBox>
          <SearchIcon src="/search.png"/>
          <SearchInput 
             placeholder="Search Movie" 
             value={searchQuery}  
             onChange={onTextChange}
          />
    </SearchBox>
  </Header>
     {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
  <MovieListContainer>
      {movieList?.length
          ?movieList.map((movie,index)=>(
          <MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect}/>
          ))
          : <Placeholder src="/movie-theater.png"/>
      }
       
       
  </MovieListContainer>

 </Container>

  );
}

export default App;













