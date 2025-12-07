import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddStudentForm from './AddStudentForm';
import { Link } from 'react-router-dom';

const API = 'http://localhost:5000/api/students';

export default function StudentList(){
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get(API)
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa học sinh này?')) return;
    axios.delete(`${API}/${id}`)
      .then(() => setStudents(prev => prev.filter(s => s._id !== id)))
      .catch(err => console.error(err));
  };

  // filter + sort
  const filtered = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const sorted = [...filtered].sort((a,b) => {
    const an = a.name.toLowerCase(), bn = b.name.toLowerCase();
    if (an < bn) return sortAsc ? -1 : 1;
    if (an > bn) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <AddStudentForm onAdded={student => setStudents(prev => [...prev, student])} />
      <div  className="search-sort">
        <input placeholder="Tìm kiếm theo tên..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <button onClick={() => setSortAsc(prev => !prev)} style={{ marginLeft: 10 }}>
          Sắp xếp: {sortAsc ? 'A → Z' : 'Z → A'}
        </button>
      </div>

      <table border="1" cellPadding="6" style={{ marginTop: 10 }}>
        <thead>
          <tr><th>Họ tên</th><th>Tuổi</th><th>Lớp</th><th>Hành động</th></tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr><td colSpan="4">Chưa có học sinh nào</td></tr>
          ) : sorted.map(s => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.age}</td>
              <td>{s.class}</td>
              <td>
                <Link to={`/edit/${s._id}`}>
                  <button className="btn btn-edit">Sửa</button>
                </Link>
                <button  
                  className="btn btn-delete" 
                  onClick={() => handleDelete(s._id)} style={{ marginLeft: 6 }}
                  >
                    Xóa
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
