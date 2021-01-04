import React from 'react';

class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            altMemeImages: []
        }
    }

    componentDidMount() {
        console.log('Component Did Mount');
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data;
                console.log(memes[0]);
                this.setState({ altMemeImages: memes })
        });
        console.log(this.state.randomImg);
    }

    handleOnChange =(event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    handleOnSubmit = (event) => {
        event.preventDefault();
        const altImage = this.state.altMemeImages;
        const randomNum = Math.floor(Math.random()*altImage.length);
        const selectRandomImg = altImage[randomNum].url;
        this.setState({
            randomImg: selectRandomImg
        })
        console.log(this.state.randomImg);
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
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;