import React from 'react';

class MemeGenerator extends React.Component {
    state = {
        topText: "",
        bottomText: "",
        randomImg: "https://media3.giphy.com/media/pOTZnu0qBWyAHMtxxe/giphy.gif?cid=20df0b07a68e66ec552dbf6451cdeaaef7f768d5ae8025e6&rid=giphy.gif",
        altMemeImages: []
    }

    componentDidMount() {
        console.log('Component Did Mount');
        // fetch('https://api.imgflip.com/get_memes')
        //     .then(response => response.json())
        //     .then(response => {
        //         const {memes} = response.data;
        //         console.log(memes[0]);
        //         this.setState({ altMemeImages: memes })
        // });
        // console.log(this.state.randomImg);
        fetch('https://api.giphy.com/v1/gifs/random?api_key=J4lNqC0UDXDmMDfzt7pyQZAfARVRICS7&tag=&rating=pg-13')
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data.url;
                this.setState({ altMemeImages : memes })
                console.log(response.data.url);
            })
    }       

    handleOnChange =(event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        // const altImage = this.state.altMemeImages;
        // const randomNum = Math.floor(Math.random()*altImage.length);
        // const selectRandomImg = altImage[randomNum].url;
        // this.setState({
        //     randomImg: selectRandomImg,
        //     topText: "",
        //     bottomText: "" 
        // });

        fetch('https://api.giphy.com/v1/gifs/random?api_key=J4lNqC0UDXDmMDfzt7pyQZAfARVRICS7&tag=&rating=pg-13')
        .then(response => response.json())
        .then(response => {
            const memes = response.data.fixed_height_downsampled_url;
            console.log(response.data);
            this.setState({ 
                randomImg : memes,
                topText: "",
                bottomText: ""
            })
        })
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleOnSubmit}>
                    <input 
                        type="text" 
                        name="topText" 
                        value={this.state.topText} 
                        onChange={this.handleOnChange}
                        placeholder="Top Text"
                    />
                    <input 
                        type="text" 
                        name="bottomText" 
                        value={this.state.bottomText} 
                        onChange={this.handleOnChange}
                        placeholder="Bottom Text"    
                    />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} crossOrigin="anonymous" alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;