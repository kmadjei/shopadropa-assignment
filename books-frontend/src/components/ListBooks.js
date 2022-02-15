import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';



const ListBooks = (props) => {

    let navigate = useNavigate();
    // const  [books, setBooks]  = useState([]);
    // setBooks(props.books);
    const [books, setBooks] = useState(props.books);

    console.log(books)

    const handleDelete = async (id, name) => {
        const delete_book = window.confirm(`Are you sure you want to delete "${name}"`);

        if (delete_book){
            let response = await fetch(
                `http://localhost:4000/books/${id}`,
                { method: "DELETE" }
            );
            let newBooks = await response.json();
           
            setBooks(newBooks.filter(book => book.books_id !== id));
            alert(`Book: ${name} is deleted`);
        } else {
            // back to home page
            navigate('/');
        }
    }

    return ( 
        <div className="row">
                
            {books.map((book) => (                    
                
                <div className="card my-1 mx-auto bg-secondary text-white" 
                style={{width: "18rem"}} 
                key={book.books_id}
                >
                    <div className="card-body">
                        <h5 className="card-title">
                            {book.name}
                        </h5>                            
                    </div>
                    <ul className="list-group list-group-flush ">
                            <li className="list-group-item bg-secondary">
                                Author: {book.author}
                            </li>
                            <li className="list-group-item bg-secondary">
                                Published: {book.year_of_publishing}
                            </li>
                            <li className="list-group-item bg-secondary">
                                ISBN: {book.isbn}
                            </li>
                        </ul>
                        <div className="card-body">
                            <Link to={`/edit_book/${book.books_id}`}
                            // to={navigate(, {state: {
                            //     title: book.name,
                            //     author: book.author,
                            //     published: book.year_of_publishing,
                            //     isbn: book.isbn
                            // }})}
                            className="card-link btn btn-outline-primary"
                            >
                                Edit
                            </Link>
                            <button
                            className="card-link btn btn-outline-danger"
                            onClick={() => handleDelete(book.books_id, book.name)
                            }
                            >
                            Delete</button>
                        </div>
                </div>
            ))}

        </div>
     );
}
 
export default ListBooks;