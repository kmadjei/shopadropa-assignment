import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


const BookForm = ({ formAction }) => {

    let navigate = useNavigate();
    const { id } = useParams();


    const [processing, setProcessing] = useState(false);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publish, setPublish] = useState('');
    const [isbn, setISBN] = useState();

   
    useEffect(async () => {
        // retrieve data to be editeds
        if (formAction === 'edit') {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`);
                let bookData = await res.json();

                setTitle(bookData.name);
                setAuthor(bookData.author);
                setPublish(bookData.year_of_publishing);
                setISBN(bookData.isbn);
                
            } catch (err) {
                console.log('Error during edit get request...');
                console.error(err.message);
            }
        } 
   },[]);


    const handleSubmit = async (event) => {
        // Prevent default action
        event.preventDefault();
        setProcessing(true);

        if (formAction === 'edit') {
            
            // Edit Book
            try {
                await fetch(
                    `${process.env.REACT_APP_API_URL}/books/${id}` 
                  , {
                  method: 'PUT',
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                      name: title,
                      author: author,
                      year_of_publishing: publish,
                      ISBN: isbn
                  }) 
                });

                setProcessing(false);
                console.log(`Book Edited --> ${title}`);
                navigate('/');
            } catch (err) {
                console.error(err.message);
                navigate('*');
            }

            console.log(formAction);
        } else if (formAction === 'add') {
            
            //Add A Book
            
            
            try {
                await fetch(
                    `${process.env.REACT_APP_API_URL}/books/add_a_book` 
                  , {
                  method: 'POST',
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                        name: title,
                        author: author,
                        year_of_publishing: publish,
                        ISBN: isbn
                    }) 
                });

                setProcessing(false);
                console.log(`Book Added --> ${title}`);
                navigate('/');
            } catch (err) {
                console.error(err.message);

            }
            
            console.log(formAction);
        } else {
            console.log('Invalid formAction...');
            navigate('*');
        }
    }


    return ( 
        <div className="container my-5">
            <form 
            className="p-3 my-auto mx-auto col-md-8 bg-secondary text-white" 
            onSubmit={handleSubmit}>
            <h2 className="text-center">Add/Edit Book</h2>
                <div className="form-group">
                    <label for="title">Title</label>
                    <input type="text" className="form-control" 
                    //value={ book? book.name : 'Title of the book'}
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    placeholder="Title of the book"
                    required />
                </div>
                <div className="form-group">
                    <label for="author">Author</label>
                    <input type="text" 
                    className="form-control" 
                    id="author" 
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author of the book"
                    required />
                </div>
                <div className="form-group">
                    <label for="publish">Year Published</label>
                    <input type="number" className="form-control" 
                    id="publish" 
                    value={ publish }
                    onChange={(e) => setPublish(e.target.value)}
                    placeholder="YYYY"
                    required />
                </div>
                <div className="form-group">
                    <label for="isbn">ISBN Number</label>
                    <input type="text" 
                    className="form-control" 
                    id="isbn" 
                    value={ isbn }
                    onChange={(e) => setISBN(e.target.value)}
                    placeholder="1234-456-7890" 
                    required
                    />
                </div>
                
                { !processing && <button type="submit" className="btn btn-primary">Submit</button>}
                { processing && <button type="submit" className="btn btn-primary" disabled>Submitting Form....</button>}
            </form>
        </div>
    );
}
 
export default BookForm;