import React from 'react';
import * as handTrack from '../node_modules/handtrackjs';
import './handshake.css';

class HandshakeClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVideo : true,
      isButtonDisabled: true,
      buttonText: "Loading Model...",
      showCanvas: false
    };
    this.toggleVideo = this.toggleVideo.bind(this);
    this.video = React.createRef();
    this.canvas = React.createRef();
    this.trackButton = React.createRef();
    this.updateNote = React.createRef();
    this.context = React.createRef();
    this.model = React.createRef();
    this.runDetection = this.runDetection.bind(this);
    this.startVideo = this.startVideo.bind(this);
  }

  startVideo() {
    this.setState({isVideo: true});
    handTrack.startVideo(this.video.current).then((status) => {
        console.log("video started", status);
        if (status) {
          //this.setState({buttonText: "Video started. Now tracking", isVideo: true});
          this.runDetection();
        } else {
          //this.setState({buttonText: "Please enable video", isVideo: true});
        }
    });
  }

  runDetection() {
    this.context = this.canvas.current.getContext("2d");
    this.model.current.detect(this.video.current).then(predictions => {
        console.log("Predictions: ", predictions);
        this.model.current.renderPredictions(predictions, this.canvas.current, this.context, this.video.current);
        if (this.state.isVideo) {
            requestAnimationFrame(this.runDetection);
        }
    });
  }

  toggleVideo() {
    if (!this.state.isVideo) {
      //this.setState({buttonText: "Starting video"});
      this.startVideo();
    } else {
      //this.setState({buttonText: "Stopping video"});
      handTrack.stopVideo(this.video.current);
    }
}
  componentDidMount() {
    this.setState({isVideo: false});
    this.model.current = null;

    const modelParams = {
      flipHorizontal: true,   // flip e.g for video  
      maxNumBoxes: 20,        // maximum number of boxes to detect
      iouThreshold: 0.5,      // ioU threshold for non-max suppression
      scoreThreshold: 0.6,    // confidence threshold for predictions.
    }
    // Load the model.
    handTrack.load(modelParams).then(lmodel => {
        // detect objects in the image.
        this.model.current = lmodel
        this.setState({isButtonDisabled: false, buttonText: "Loaded Model!"});
    });

  }



  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
    return (
      <div>
        <button onClick={this.toggleVideo()} ref={this.trackButton} disabled={this.state.isButtonDisabled} 
        id="trackbutton" class="bx--btn bx--btn--secondary" type="button">
            Toggle Video
        </button>
        <div ref={this.updateNote} id="updatenote" class="updatenote mt10"> {this.state.buttonText}</div>
        <video ref={this.video} class="videobox canvasbox" autoplay="autoplay" id="myvideo"></video>
        <canvas ref={this.canvas} width={640} height={425} style={{visibility: 'hidden'}}/>
      </div>
    );
  }
}

export default HandshakeClass;