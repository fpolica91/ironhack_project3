import React, { Component } from "react";
import { Switch, Link, Route, Redirect } from "react-router-dom";
import ThreeMap from "./Components/ThreeMap";
// import SinglePost from "./Components/SinglePost";
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
import PublicProfile from "./Components/common/user.public.profile";





class App extends Component {
  state = {
    currentUser: null,
    users: [],
    username: "",
    email: "",
    password: "",
    imageUrl: "",
    imagePost: "",
    caption: "",
    tags: "",
    query: "",
    showConfirm: false,
    showFollow: false,
    showFollowig: false,
    notifications: [],
    url: "http://localhost:5000/api/things",
    fullPostUrl: "http://localhost:5000/createNewPost",
    postImgUrl: "http://localhost:5000/api/upload",
    newPostUrl: "http://localhost:5000",
    images: [],
    clone: [],
    selectedFile: null,
    message: "",
    comments: "",
    coordinates: {
      lat: 0,
      long: 0
    },
    address: ""
  };

  async componentDidMount() {
    await this.get_data_torender();
    await this.checkedLoggedIn();
    await this.getNotifications()

  }

  // logged in users!
  checkedLoggedIn = async () => {
    axios
      .get("http://localhost:5000/auth/loggedin", { withCredentials: true })
      .then(responseFromBackend => {
        const { userDoc } = responseFromBackend.data;
        this.syncCurrentUser(userDoc);
      })
      .catch(err =>
        console.log(err)

      );
  };

  logoutUsers = () => {
    const { newPostUrl } = this.state;
    axios
      .post(`${newPostUrl}/auth/logout`, { withCredentials: true })
      .then(() => {
        this.setState({
          currentUser: null
        });
        this.syncCurrentUser(null);
      });
  };

  redirect = () => {
    return <Redirect to="/public" />;
  };

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
              console.log(response.data)
              const clone = [...this.state.images];
              console.log(response.data)
              clone.push(response.data.post);
              this.setState({
                images: clone
              });
            })
            .catch(err => console.log(err));
        });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };


  handleCoordinates = async (coordinate) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.geoLocate(position)
        this.setState({
          coordinates: {
            lat: position.coords.latitude,
            long: position.coords.longitude
          }
        })
      })
    }
  }


  geoLocate = async (position) => {
    let lat = position.coords.latitude
    let long = position.coords.longitude
    axios({
      "method": "GET",
      "crossDomain": true,
      "url": `https://us1.locationiq.com/v1/reverse.php?key=bc6a72a073f3ed&lat=${lat}&lon=${long}&format=json`,
    }).then(response => {
      let location = response.data.address
      this.setState({
        address: location
      })
    })

      .catch(err => console.log(err))

  }



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
    const { newPostUrl } = this.state
    axios.get(`${newPostUrl}/auth/users`)
      .then(response => {
        this.setState({
          users: response.data
        })
      })
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
    axios
      .post("http://localhost:5000/auth/login", this.state, {
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

        return <Redirect to="/profile" />;

      })
      .catch(err => {
        console.log(err);
        // if (err.response.data)
        // this.setState({ errorMessage: err.response.data.message });
      });
  };

  handleLike = image => {
    const { newPostUrl } = this.state;
    const { currentUser } = this.state;
    const images = [...this.state.images]
    const user = { ...this.state.currentUser }
    const users = [...this.state.users]
    let owner = users.find(user => user._id === image.owner._id)
    let ind = users.indexOf(owner)
    users[owner] = { ...users[owner] }
    const image_index = images.indexOf(image)
    images[image_index] = { ...images[image_index] }
    let index = images[image_index].likes.find(like => like._id === user._id)
    console.log(images[image_index].likes)

    console.log(index)

    if (!index) {
      images[image_index].likes.push(user)
      this.setState({
        users,
        images,
        currentUser
      })
    }

    if (index) {
      let us_r = images[image_index].likes.find(like => like._id === user._id)
      let user_index = images[image_index].likes.indexOf(us_r)
      images[image_index].likes.splice(user_index, 1)
      this.setState({
        users,
        images,
        currentUser
      })
    }


    axios
      .post(`${newPostUrl}/update/${image._id}`, { currentUser })

      .catch(err => {
        if (err) {
          console.log(err)
        }
      });

  };

  handleQuery = query => {

    const { clone } = this.state;
    let list = clone.filter(image => {
      return image.tags.find(item => item.includes(query));
    });
    console.log(list)

    if (query) {
      this.setState({
        query,
        images: list,
      });
    } else {
      this.setState({
        images: clone,
        query
      })
    }
  };

  handleDelete = imageId => {
    const { newPostUrl } = this.state
    const { currentUser } = this.state
    const clone = [...this.state.images]
    let image = clone.findIndex(img => img._id === imageId)
    clone.splice(image, 1)
    this.setState({
      images: clone
    })
    axios.post(`${newPostUrl}/delete/${imageId}`, { currentUser })
      .then(response => response.data)
      .catch(err => console.log(err))
  }

  confirmDelete = e => {
    this.setState({
      showConfirm: true
    })
  }

  cancelDelete = e => {
    this.setState({
      showConfirm: false
    })
  }

  showModal = pic => {
    const images = [...this.state.images]
    const index = images.indexOf(pic)
    images[index] = { ...images[index] }
    images[index].modal = !images[index].modal
    console.log(images[index])
    this.setState({
      images
    })
  }

  submitUpdate = (e, image) => {
    e.preventDefault()
    const { newPostUrl, caption, tags } = this.state
    const images = [...this.state.images]
    const index = images.indexOf(image)
    images[index] = { ...images[index] }
    images[index].tags = []
    images[index].tags.push(tags)
    images[index].caption = caption
    images[index].modal = false
    this.setState({
      images,
      caption: "",
      tags: ""
    })


    axios.put(`${newPostUrl}/updatePost/${image._id}`, { tags, caption })




  }

  handleFollow = (user) => {

    const { newPostUrl } = this.state
    const { currentUser } = this.state

    const users = [...this.state.users]
    let index = users.indexOf(user)

    let found = users[index].followers.find(follower => follower._id === currentUser._id)

    if (!found) {
      users[index].followers.push(currentUser)
      users.filter(user => user._id === currentUser._id)
        .map(item => item.following.push(user))
      this.setState({ users, message: "Following" })
    }

    if (found) {
      let req = users[index].followers.find((follower, index) => follower._id === currentUser._id, index)
      let requesting = users.find(user => user._id === currentUser._id)
      let index1 = users.indexOf(requesting)
      let req1 = users[index1].following.find(followed => followed._id === user._id)
      let index_requested = users[index1].following.indexOf(req1)
      let index_req = users[index].followers.indexOf(req)
      users[index1].following.splice(index_requested, 1)
      users[index].followers.splice(index_req, 1)
      this.setState({
        users,
        message: "Follow"
      })

    }

    axios.post(`${newPostUrl}/follow/${user._id}`, { currentUser })

  }


  showFollowers = (e) => {
    if (e.currentTarget.id === "followers") {
      this.setState({
        showFollow: !this.state.showFollow,
        showFollowig: false
      })
    }
    if (e.currentTarget.id === "following") {
      this.setState({
        showFollowig: !this.state.showFollowig,
        showFollow: false
      })
    }
  }



  handleComment = (e, image, user) => {
    e.preventDefault()

    const { currentUser } = this.state
    const images = [...this.state.images]
    const users = [...this.state.users]
    const user_index = users.indexOf(user)
    users[user_index] = { ...users[user_index] }
    const { comments } = this.state
    let index = images.indexOf(image)
    images[index] = { ...images[index] }
    images[index].comments.push({ user: currentUser, comment: comments })

    this.setState({
      currentUser,
      images,
      users,
      comments: ""
    })

    const { newPostUrl } = this.state
    axios.put(`${newPostUrl}/addComments/${image._id}`, {
      currentUser, comments
    })

  }

  getNotifications = async () => {
    const { newPostUrl } = this.state
    await axios.get(`${newPostUrl}/notifications`)
      .then(response => {
        let notifications = response.data
        this.setState({
          notifications
        })
      })
  }



  render() {
    return (
      <div className="App">
        <div>
          <NavBar currentUser={this.state.currentUser} images={this.state.images} />

          <Switch>
            <Route
              exact
              path="/newPost"
              render={props =>
                this.state.currentUser ? (
                  <PostForm
                    {...props}
                    handleCoords={this.handleCoordinates}
                    handleSubmit={this.postNewExp}
                    changeFile={this.changeFile}
                    changeUrl={this.changeImgUrl}
                    onChangeValue={this.updateForm}
                    formValues={this.state}
                  />
                ) : (
                    <Redirect to="/login" />
                  )
              }
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
              render={props =>
                this.state.currentUser ? (
                  <Profile {...props} currentUser={this.state.currentUser} />
                ) : (
                    <Redirect to="/login" />
                  )
              }
            />
            <Route
              exact
              path="/images"
              render={props => <List {...props} images={this.state.images} />}
            />
            <Route
              exact
              path="/public"
              render={props =>
                this.state.currentUser ? (
                  <Card
                    {...props}
                    users={this.state.users}
                    currentUser={this.state.currentUser}
                    searchTerm={this.state.query}
                    onQuery={this.handleQuery}
                    images={this.state.images}
                    onLike={this.handleLike}
                  />
                ) : (
                    console.log('broken')
                    // <Redirect to="/login" />    if you use redirect it breaks do not use redirect//
                  )
              }
            />

            <Route
              exact
              path={"/post/:id"}
              render={props =>
                this.state.currentUser ? (
                  <Single {...props} images={this.state.images} />
                ) : (
                    <Redirect to="/login" />
                  )
              }
            />

            <Route
              exact
              path={"/profile/:id"}
              render={props =>
                this.state.currentUser ? (
                  <UserProfile
                    {...props}
                    notifications={this.state.notifications}
                    handleSubmit={this.handleComment}
                    comments={this.state.comments}
                    showFollowers={this.state.showFollow}
                    showFollowing={this.state.showFollowig}
                    showFollow={this.showFollowers}
                    caption={this.state.caption}
                    tags={this.state.tags}
                    submitUpdate={this.submitUpdate}
                    handleModal={this.showModal}
                    confirmDelete={this.confirmDelete}
                    handleUpdate={this.updateForm}
                    showConfirm={this.state.showConfirm}
                    images={this.state.images}
                    onLogout={this.logoutUsers}
                    users={this.state.users}
                    currentUser={this.state.currentUser}
                    onDelete={this.handleDelete}
                    cancelDelete={this.cancelDelete}
                  />
                ) : (
                    <Redirect to="/login" />
                  )
              }
            />


            <Route
              exact
              path=
              {"/public/profile/:id"}
              render={props =>
                <PublicProfile
                  {...props}
                  notifications={this.state.notifications}
                  handleSubmit={this.handleComment}
                  handleChange={this.updateForm}
                  comments={this.state.comments}
                  showFollowers={this.state.showFollow}
                  showFollowing={this.state.showFollowig}
                  showFollow={this.showFollowers}
                  message={this.state.message}
                  currentUser={this.state.currentUser}
                  handleFollow={this.handleFollow}
                  users={this.state.users}
                  images={this.state.images}
                />}
            />


          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
