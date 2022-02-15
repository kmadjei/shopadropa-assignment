import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import BookForm from './pages/BookForm';
import Home from './pages/Home'
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add_book" 
          element={<BookForm formAction={'add'} />} />
          <Route path="/edit_book/:id" 
          element={<BookForm formAction={'edit'} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
