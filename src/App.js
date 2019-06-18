import React, { Component } from 'react';
import './App.css';
// import ImageCard from "./components/ImageCard";
import images from "./images.json";
// import Wrapper from "./components/Wrapper";


class App extends Component {
  // Setting this.state.friends to the friends json array
  constructor(props){
    super(props)
    this.state = {
      images: images,
      score: 0,
      highScore: 0,
      unMatched: images,
      message: "Click any emoji to start play!"
    };
  }
 

  clickedImages = (event, id) => {
    console.log(id)
    //function to filter the matched array, store in variable
    const clicked = this.state.unMatched.find(image => image.id === id);

    // add click high score out of the if else
    if(clicked === undefined) {
      this.setState({
        message : "Sorry, you chose that emoji already. Click any emoji to play again!",
        score : 0,
        highScore : (this.state.score > this.state.highScore) ? this.state.score : this.state.highScore,
        images : images,
        unMatched : images

      });
      
    }else{
      const updatedArray = this.state.unMatched.filter(match => match.id !== id);
      this.setState({
        message : "Way to go, keep picking!",
        score : this.state.score + 1,
        images : images,
        highScore : (this.state.score > this.state.highScore) ? this.state.score : this.state.highScore,
        unMatched : updatedArray
      })
    }

    this.shuffleArray();

  }

  shuffleArray = () => {
    let newArray =  this.state.images.sort(() => Math.random() - 0.5);
    this.setState({
      images: newArray
    })
  }


  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (
 
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Let's play Clicky Game! <hr></hr>Click each emoji only once to score more points.</h1>
          <p>{this.state.message}</p>
        </header>
        <div className="conatiner-fluid">
          <div className="row">
          <div className="col-sm-3">
              <h3>Top Score: {this.state.highScore} </h3>
            </div>
          <div className="col-sm-3">
              <h3>Click Counter: {this.state.score}</h3>
          </div>
            <div className="col-xs-6">
              <h3>{this.state.message} </h3>
            </div>
             
          </div>
        </div>
        <div>
          
          {this.state.images.map(image => (
              <img
                id={image.id}
                key={image.id}
                name={image.name}
                src={image.image}
                onClick={(event)=>this.clickedImages(event, image.id)}
                alt={image.name}
              />

          ))}


        </div>
      </div>

    );
  }
}
export default App;
