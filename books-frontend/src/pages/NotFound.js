//------------------404 redirect component-------------/

import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="alert alert-warning">
      <h2>Sorry</h2>
      <p>That page cannot be found</p>
      <Link to="/">Back to the homepage...</Link>
    </div>
  );
}
 
export default NotFound;