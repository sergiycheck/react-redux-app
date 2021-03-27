import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import {PostsList} from './features/posts/PostsList'
import {AddPostForm} from './features/posts/AddPostForm'
import {SinglePost} from './features/posts/SinglePostPage'
import {EditPostForm} from './features/posts/EditPostForm'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">

        <Switch>

          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <div className="container-fluid">
                  <div className="d-flex justify-content-center">
                    <div className="container">
                      <PostsList></PostsList>
                    </div>
                    <div className="col-sm-3">
                      <AddPostForm></AddPostForm>
                      
                    </div>
                    
                  </div>

                </div>
                
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePost}></Route>
          <Route exact path="/editPost/:postId" component={EditPostForm}></Route>
          <Redirect to="/" />

        </Switch>
      </div>
    </Router>
  )
}

export default App
