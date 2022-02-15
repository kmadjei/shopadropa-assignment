import ListBooks from "../components/ListBooks";

import { useState, useEffect } from 'react';


const Home = () => {

    const [booksData, setBooksData] = useState(null);

    const getBooks = async () => {
        try {
            const response = await fetch('http://localhost:4000/books');
            const json_data = await response.json();
            console.log(json_data);
            setBooksData(json_data);
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getBooks();
    }, [, ]); 

    return ( 
        <div className="home container col-md-8 py-5">
            {booksData && <ListBooks books={booksData} />}
        </div>
    );
}
 
export default Home;