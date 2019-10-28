import React, { Component } from "react";
import { Switch, Link, Route, Redirect } from "react-router-dom";
import ThreeMap from "./Components/ThreeMap";
import SinglePost from "./Components/SinglePost";
import PostForm from "./Components/PostForm";
import Signup from "./Components/user-pages/Signup";
import Login from "./Components/user-pages/Login";
import Profile from "./Components/Profile";





import "./index.css";
import axios from "axios";

//CLOUDINARY
import service from "./api/service";
import List from "./Components/post.list";
import Card from "./Components/cards";
import Single from "./Components/common/single";
import NavBar from "./Components/common/navBar";
import UserProfile from "./Components/common/user.profile";

class App extends Component {
  state = {
    currentUser: null,
    username: "",
    email: "",
    password: "",
    imageUrl: "",
    imagePost: "",
    caption: "",
    tags: "",
    query: "",
    // imageFile: [],
    url: "http://localhost:5000/api/things",
    fullPostUrl: "http://localhost:5000/createNewPost",
    postImgUrl: "http://localhost:5000/api/upload",
    newPostUrl: "http://localhost:5000",
    images: [],
    clone: [],
    selectedFile: null,
    message: "",
    errorMessage :""
  };

  async componentDidMount() {
    await this.get_data_torender();
    await this.checkedLoggedIn()
   
  }

  

  // logged in users!
  checkedLoggedIn = async() =>{
    axios
    .get("http://localhost:5000/auth/loggedin", { withCredentials: true })
    .then(responseFromBackend => {
      const { userDoc } = responseFromBackend.data;
      this.syncCurrentUser(userDoc);
    })
    .catch(err =>
     this.setState({errorMessage: err.response.data.message})
    );
  }

  logoutUsers =() =>{
    const {newPostUrl} = this.state
    axios.post(`${newPostUrl}/auth/logout`, {withCredentials: true })
    .then(() =>{
      this.setState({
        currentUser: null
      })
      this.syncCurrentUser(null)
    })
  }

  redirect = () =>{
    return <Redirect to="/public"/>
  }


  syncCurrentUser(user) {
    this.setState({ currentUser: user });
  }

  file_upload_change = e => {
    const formData = new FormData();
    formData.append("imageUrl", e.target.files[0]);
    if (!formData === "") {
      this.setState({
        selectedFile: formData
      });
    }
  };

  // MAKE A NEW POST

  postNewExp = async e => {
    e.preventDefault();
    const uploadData = new FormData();
    await uploadData.append("imageUrl", this.state.imageFile);
    service
      .handleUpload(uploadData)
      .then(response => {
        this.setState({ imagePost: response.imageUrl }, () => {
          axios
            .post("http://localhost:5000/createNewPost", this.state, {
              withCredentials: true
            })
            .then(response => {
              const clone = [...this.state.images];
              clone.push(response.data);
              this.setState({
                images: clone
              })
            })
            .catch(err => console.log(err));
        });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
    
      
  };

  renderImages = () => {
    const { images } = this.state.images;
    return images.map(image => {
      return (
        <div>
          <div>
            <ThreeMap key={image._id} {...image} url={image.imageUrl} />
          </div>
          <div>HELLO MY NAME IS JESUS </div>
        </div>
      );
    });
  };

  get_data_torender = async () => {
    try {
      const { fullPostUrl } = this.state;
      await axios.get(fullPostUrl).then(response => {
        this.setState({
          images: response.data,
          clone: response.data
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  updateForm = e => {
    console.log(e.currentTarget);
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  changeImgUrl = e => {
    this.setState({ imageUrl: e });
  };

  changeFile = e => {
    this.setState({ imageFile: e });
  };

  makeNewUser = e => {
    e.preventDefault();
    if (this.state.imageFile) {
      //UPLOAD TO CLOUDINARY
      const uploadData = new FormData();
      uploadData.append("imageUrl", this.state.imageFile);

      service
        .handleUpload(uploadData)
        .then(response => {
          console.log("response is: ", response);
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state
          this.setState({ imagePost: response.imageUrl }, () => {
            //CALL TO THE SIGNUP ROUTE
            axios
              .post("http://localhost:5000/auth/signup", this.state, {
                withCredentials: true
              })
              .then(theData => {
                console.log("NEW USER!");
                console.log(theData);
                this.setState({
                  finished: true,
                  username: "",
                  email: "",
                  password: "",
                  imageUrl: "",
                  imageFile: []
                });
              })
              .catch(err => console.log(err));
          });
        })
        .catch(err => {
          console.log("Error while uploading the file: ", err);
        });
    } else {
      //CALL TO THE SIGNUP ROUTE
      axios
        .post("http://localhost:5000/auth/signup", this.state, {
          withCredentials: true
        })
        .then(theData => {
          console.log("NEW USER!");
          console.log(theData);
          this.setState({
            finished: true,
            username: "",
            email: "",
            password: "",
            imageUrl: "",
            imageFile: []
          });
        })
        .catch(err => console.log(err));
    }
  };

  loginUser = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/auth/login", this.state, {
        withCredentials: true
      })
      .then(responseFromServer => {
        console.log(responseFromServer.data.userDoc);
        const { userDoc } = responseFromServer.data;
        this.syncCurrentUser(userDoc);
        this.setState({
          username: "",
          password: ""
        });

        alert("You are logged in.");
        return <Redirect to='/profile'/>
      })
      .catch(err => {
        console.log(err);
        if(err.response.data) this.setState({errorMessage: err.response.data.message})
      });
  };

  handleLike = image => {
    const {newPostUrl} = this.state
    console.log(image._id)
    const {currentUser} = this.state
    axios.post(`${newPostUrl}/update/${image._id}`,{
      currentUser
    })
    // .then(response => {
    //   const index  = images.indexOf(image).disabled 
    //   images[index] = {...images[index]}
    //   images[index].disabled = !images[index].disabled
    //   // images.push(response.data)
    //   this.setState({
    //     images, 
    //   })
    // })

    const images = [...this.state.images];
    const index = images.indexOf(image);
    images[index] = {...images[index]}
    images[index].disabled = !images[index].disabled;
    this.setState({ images });
  };

  handleQuery = query => {
    const { clone } = this.state;
    let list = clone.filter(image => {
      return image.tags.find(item => item.includes(query));
    });

    this.setState({
      query,
      images: list
    });
  };

  render() {
  
    return (
      <div className="App">
        <div>
          <NavBar />

          <Switch>
            <Route
              exact
              path="/theImg"
              render={props => (
                <SinglePost {...props} myUrl={this.state.images} />
              )}
            />
            <Route
              exact
              path="/newPost"

              render={props => (
                 this.state.currentUser?
                <PostForm
                  {...props}
                  handleSubmit={this.postNewExp}
                  changeFile={this.changeFile}
                  changeUrl={this.changeImgUrl}
                  onChangeValue={this.updateForm}
                  formValues={this.state}
                /> :
                <Redirect to="/login"/>
              )}
            />
            <Route
              exact
              path="/signup"
              render={props => (
                <Signup
                  {...props}
                  onChangeValue={this.updateForm}
                  changeFile={this.changeFile}
                  handleSubmit={this.makeNewUser}
                  currentUser={this.state.currentUser}
                  onUserChange={userDoc => this.syncCurrentUser(userDoc)}
                  formValues={this.state}
                />
              )}
            ></Route>
            <Route
              exact
              path="/login"
              render={props => (
                <Login
                  {...props}
                  onChangeValue={this.updateForm}
                  handleSubmit={this.loginUser}
                  currentUser={this.state.currentUser}
                  formValues={this.state}
                />
              )}
            ></Route>
            <Route
              exact
              path="/profile"
              render={props => (
                this.state.currentUser?
                <Profile {...props} currentUser={this.state.currentUser} />
                : <Redirect to="/login"/>
              )}
            />
            <Route
              exact
              path="/images"
              render={props => <List {...props} images={this.state.images} />}
            />
            <Route
              exact
              path="/public"
              render={props => (
                <Card
                  {...props}
                  searchTerm={this.state.query}
                  onQuery={this.handleQuery}
                  images={this.state.images}
                  onLike={this.handleLike}
                  
                />
              )}
            />

            <Route
              exact
              path={"/post/:id"}
              render={props => 
              
              <Single {...props} images={this.state.images} />
             
              }
            />

            <Route
              exact
              path={"/profile/:id"}
              render={props => (
                <UserProfile 
                {...props}
                 images={this.state.images} 
                 onLogout={this.logoutUsers}
                 currentUser={this.state.currentUser}
                 />
                 
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
