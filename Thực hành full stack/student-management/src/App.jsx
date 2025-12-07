import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import EditStudent from './components/EditStudent';
import './App.css';

function App(){
  return (
    <Router>
      <div className="container">
        <h1>Quản lý học sinh</h1>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/edit/:id" element={<EditStudent />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
