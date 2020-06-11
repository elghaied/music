import React, { Component } from "react";
import More from "./More";
import Songs from "./Songs";
import { mainSearch, trackInfo, getCover } from "../api/musicApi";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shown: false,
      songs: [],
      message: "",
      type: "artist",
      count: 0,
      more: [],
      cover: [],
      id: "",
      coversID: [],
      offset: 0,
      alert: false,
      alertMessage: '',
      loading: false,

     
    };
    this.searchBox = React.createRef();
  }

  handelChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handeloffset = (event) => {

    event.preventDefault();

    let mysearch = this.state.message;
    let mytype = this.state.type;
    let myoffset = this.state.offset + 100;
    console.log("handeloffset",mysearch,myoffset,mytype);
 
    mainSearch(mytype, mysearch, myoffset, (response) => {
      this.setState({
        songs:  [...this.state.songs,...response.recordings],
        offset: myoffset
      });
      console.log(this.state.songs);
      console.log(response.recordings);
     
    });


    console.log(this.state.offset);
  }
  handelSubmit = (event) => {
    event.preventDefault();

    let mysearch = this.state.message;
    let mytype = this.state.type;
    let myoffset = this.state.offset;
    if(myoffset !== 0){
      myoffset = 0;

    }
    
    console.log(mytype, mysearch);
    mainSearch(mytype, mysearch, myoffset, (response) => {
      this.setState({
        songs: response.recordings,
        offset: 0,
        count : response.count,
        alert : response.recordings.length === 0 ? true : false ,
        alertMessage : response.recordings.length === 0 ? "There's are no Results" : ""
      });
      console.log("search results",response.recordings);
      console.log("search lentgh",response.recordings.length);
    });
  };
  handelClose = (event) => {
    event.preventDefault();
    document.body.style.overflow = "auto";

    this.setState({
      more: [],
      shown: false,
      cover:[],
      
    
    });
  };

  handelMore = (event) => {
   
    console.log("before set state",this.state.loading);
    console.log(event.target.name);
    document.body.style.overflow = "hidden";

    // to recover more information about specific content
    trackInfo(event.target.name, (response) => {
      this.setState({
        loading: true,
        shown: true,
        more: response,
        id: response.id,
        coversID: response.releases.map((cover) => cover.id),
      });
      console.log("after setstate in handel more ",this.state.loading);
      console.log("more", response);
      console.log("cover ids", this.state.coversID);
      let mycover = response.releases.map((cover) => cover.id);
      handelCover(mycover);
    });

    // To get cover photo

    let handelCover = (event) => {
      event.map((cdID) =>
        getCover(cdID, (response) => {
          console.log("conver respone",response);
          if (response.images !== undefined) {
            response.images.map((img) =>
              // typeof(img.image)!=='undefined' ? img.image : null

              this.setState({
                cover: [...this.state.cover, img.image],
              })
            );
          }
        })
      );
      this.setState({
        loading: false,

      })
      

    };

    console.log("after album",this.state.loading);
  };
  componentDidMount() {
    this.searchBox.current.focus();
  }
 
  componentDidUpdate(){
    // console.log(this.state.cover);
    // console.log("componentUpdate",this.state.offset);
    // console.log("did update loading",this.state.loading);

  }


  render() {
    const { message, type, songs, more, cover, shown,alertMessage,alert,count,loading} = this.state;
  
    return (
      <main>
        <form className="searchForm" onSubmit={this.handelSubmit}>
          <input
            ref={this.searchBox}
            type="text"
            name="message"
            value={message}
            placeholder="Title,Artist,Album..."
            onChange={this.handelChange}
          ></input>
          <select value={type} name="type" onChange={this.handelChange}>
            <option value="artist">Artist</option>
            <option value="event">Event</option>
            <option value="recording">Recording</option>
            <option value="release">Release</option>
            <option value="release_group">Release Group</option>
            <option value="series">Series</option>
            <option value="work">Work</option>
            <option value="area">Area</option>
            <option value="instrument">Instrument</option>
            <option value="label">Label</option>
            <option value="place">Place</option>
            <option value="annotation">Annotation</option>
            <option value="tag">Tag</option>
            <option value="cdstub">CD Stub</option>
            <option value="editor">Editor</option>
            <option value="doc">Documentation</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        {songs.length ? (
          <>
          {/* here to show the result and load more  */}

        <p className="counter">There are {songs.length} results out of {count} for more results press <button className="load" onClick={this.handeloffset}> Add more </button></p>
          <table>
            <tbody>
              <tr className="TableHeader">
                <th>#</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Album</th>
                <th>See More+</th>
              </tr>

              {songs.map((song, index) => (
                <Songs
                  key={index}
                  {...song}
                  myIndex={index + 1}
                  songObj={song}
                  handelMore={this.handelMore}
                />
              ))}
            </tbody>
          </table>
          <div className="addmore"><button className="load" onClick={this.handeloffset}> Add more </button></div>
          

          </>
        ) : null}

        {shown ? (
          
          <More
           
            cover={cover}
            more={more}
            {...more}
            handelClose={this.handelClose}
          />
        ) : null}
        {alert ? <p className="alert"> {alertMessage} </p> : null}

        {loading ? <div className="loading">  <img src={'../img/loadingImage.gif'} alt="loading"/>
        
        <p>loading</p>
 </div> : null}
      </main>
    );
  }
}

export default Search;
