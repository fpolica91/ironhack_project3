import React, { Component } from "react";
// import api from "../services/api";
// import io from "socket.io-client";

import "./css/feed.css"

// import more from "../assets/more.svg";
// import like from "../assets/like.svg";
// import comment from "../assets/comment.svg";
// import send from "../assets/send.svg";

class Test extends Component {
    //   state = {
    //     feed: []
    //   };

    //   async componentDidMount() {
    //     this.registerToSocket();

    //     const response = await api.get("posts");

    //     this.setState({ feed: response.data });
    //   }

    //   registerToSocket = () => {
    //     const socket = io("http://localhost:3333");

    //     socket.on("post", newPost => {
    //       this.setState({ feed: [newPost, ...this.state.feed] });
    //     });

    //     socket.on("like", likedPost => {
    //       this.setState({
    //         feed: this.state.feed.map(post =>
    //           post._id === likedPost._id ? likedPost : post
    //         )
    //       });
    //     });
    //   };

    //   handleLike = id => {
    //     api.post(`/posts/${id}/like`);
    //   };

    render() {
        return (
            <section id="post-list">
                {/* {this.state.feed.map(post => ( */}
                <article >
                    <header>
                        <div className="user-info">
                            <span>Author</span>
                            <span className="place">Miami</span>
                        </div>

                        {/* <img src={more} alt="Mais" /> */}
                    </header>

                    {/* <img src={`http://localhost:3333/files/${post.image}`} alt="" /> */}
                    <img src="https://image.shutterstock.com/image-vector/keep-simple-business-concept-lightbulbs-260nw-489515029.jpg" />

                    <footer>
                        <div className="actions">
                            <button>Like</button>
                            {/* <button type="button" onClick={() => this.handleLike(post._id)}>
                  <img src={like} alt="" />
                </button> */}
                            {/* <img src={comment} alt="" /> */}
                            {/* <img src={send} alt="" /> */}
                        </div>

                        <strong> curtidas</strong>

                        <p>
                            {/* {post.description} */}
                            <span>miami</span>
                        </p>
                    </footer>
                </article>
                {/* ))} */}
            </section>
        );
    }
}

export default Test;