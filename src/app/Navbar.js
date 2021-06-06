import React from 'react'
import {Link} from 'react-router-dom';
import {allUsersRoute} from '../features/ApiRoutes'

export const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Blogging</h1>

        <div className="navContent">
          <div className="navLinks">
          <Link to="/">Posts</Link>
          <Link to={`${allUsersRoute}`}>Users</Link>
          </div>
        </div>
      </section>
    </nav>
  )
}
