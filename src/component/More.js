import React, { Component } from "react";

class More extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }


 
  render() {
    const { cover,handelClose, genres, releases, title, rating, length, more } = this.props;
    let album = "";

    if (
      Array.isArray(releases) &&
      releases.length > 0 &&
      releases[0].hasOwnProperty("title")
    ) {
      album = releases[0].title;
    }
    
    function duration(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return(seconds === 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
      }
      
      
      
      
    return (
      <div className="modale">
        <div className="madaleContainer">
          <ul>
            <li> <span className="title">Title</span> : {title}</li>
            <li>
            <span className="title">Artist</span>  :
              {more["artist-credit"].map((artist, index) => (
                <p key={artist["artist"].id}>{artist["artist"]["name"]}</p>
              ))}
            </li>
            <li><span className="title">Album</span>  : {album}</li>
            <li>
            <span className="title">Genre</span>
               :{" "}
              {genres.map((genre, index) => (
                <p className="genre" key={index}>{genre["name"]} </p> 
              ))}
            </li>

            <li>
            <span className="title">Durée</span>
               : {duration(length)} </li>
            <li>
            <span className="title">Note</span>
               : {rating.value ? rating.value : 0}/5 ({rating["votes-count"]} vote){" "}
            </li>
            
            <span className="closeButton" onClick={handelClose}>CLOSE</span>
         
            
          </ul>
          
          <div className="album">
             {cover ? cover.map((cimage,index) =><img key={index} src={cimage} alt="cover" />)    : null }
             </div>
        </div>
      </div>
    );
  }
}

export default More;
