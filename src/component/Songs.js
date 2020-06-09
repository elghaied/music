import React, { Component } from "react";

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state ={
    
    }
  }

  

  render() {
    const { id,title, myIndex, songObj,handelMore,releases} = this.props;
    let album = ""; 
    
    if(Array.isArray(releases) && releases.length > 0 && releases[0].hasOwnProperty('title')) {
      album = releases[0].title;
  }
    return (
      <tr className="tableRow">
        <td>{myIndex}</td>

        <td>{title}</td>

        <td>
          {songObj["artist-credit"].map((artist, index) => (
            <p key={index}>{artist["artist"]["name"]}</p>
          ))}
        </td>

        <td>  {album} </td>


        <td>
          <button name={id} onClick={handelMore}>More</button>
        </td>
      </tr>
    );
  }
}

export default Songs;
