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
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
