import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header>
    <nav>
      <Link to="/">{siteTitle}</Link>
      <Link to="/how-it-works" className="flex-end">
        How it works? 💡
      </Link>
      <Link to="/about" className="flex-end">
        About 👀
      </Link>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
