import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid col-md-8 justify-content-center">
        <a class="navbar-brand" href="#">Shopadropa Books</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse " id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto justify-content-end">
            <li class="nav-item active">
                <Link class="nav-link" to="/">Home</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" to="/add_book">Add A Book</Link>
            </li>            
            </ul>
            </div>
        </div>
        </nav>
    );
}
 
export default Navbar;