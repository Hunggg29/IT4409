import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const API = 'http://localhost:5000/api/students';

export default function EditStudent(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [stuClass, setStuClass] = useState('');

  useEffect(() => {
    axios.get(`${API}/${id}`)
      .then(res => {
        setName(res.data.name);
        setAge(res.data.age);
        setStuClass(res.data.class);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`${API}/${id}`, { name, age: Number(age), class: stuClass })
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleUpdate}>
      <h3>Chỉnh sửa học sinh</h3>
      <input required placeholder="Họ tên" value={name} onChange={e => setName(e.target.value)} />
      <input required placeholder="Tuổi" type="number" value={age} onChange={e => setAge(e.target.value)} />
      <input required placeholder="Lớp" value={stuClass} onChange={e => setStuClass(e.target.value)} />
      <button type="submit">Lưu</button>
      <button type="button" onClick={() => navigate('/')}>Hủy</button>
    </form>
  );
}
