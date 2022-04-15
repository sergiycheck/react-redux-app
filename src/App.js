import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Navbar } from "./app/Navbar";
import { PostsList } from "./features/posts/PostsList";
import { AddPostForm } from "./features/posts/AddPostForm";
import { SinglePost } from "./features/posts/SinglePostPage";
import { EditPostForm } from "./features/posts/EditPostForm";
import {
  singlePostRoute,
  editPostRoute,
  allUsersRoute,
  singleUserPageRoute,
  notificationsRoute,
} from "./api/ApiRoutes";

import { UsersList } from "./features/users/UserList";
import { SingleUserPage } from "./features/users/SingleUserPage";
import { NotificationList } from "./features/notifications/NotificationList";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <div className="container-fluid">
                  <div className="container">
                    <div className="row">
                      <section className="order-sm-max-2 posts-list col-md-8 ">
                        <PostsList></PostsList>
                      </section>

                      <div className="order-sm-max-1 col-md-4 ">
                        <AddPostForm></AddPostForm>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
          <Route exact path={singlePostRoute} component={SinglePost}></Route>
          <Route exact path={editPostRoute} component={EditPostForm}></Route>

          <Route exact path={allUsersRoute} component={UsersList}></Route>
          <Route
            exact
            path={singleUserPageRoute}
            component={SingleUserPage}
          ></Route>

          <Route
            exact
            path={notificationsRoute}
            component={NotificationList}
          ></Route>

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
