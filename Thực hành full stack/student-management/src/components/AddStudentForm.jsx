import React, { useState } from 'react';
import axios from 'axios';
const API = 'http://localhost:5000/api/students';

export default function AddStudentForm({ onAdded }){
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [stuClass, setStuClass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newStu = { name, age: Number(age), class: stuClass };
      const res = await axios.post(API, newStu);
      onAdded(res.data);
      setName(''); setAge(''); setStuClass('');
      // optional: show success message
    } catch (err) {
      console.error(err);
      alert('Lỗi khi thêm học sinh');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input required placeholder="Họ tên" value={name} onChange={e => setName(e.target.value)} />
      <input required placeholder="Tuổi" type="number" value={age} onChange={e => setAge(e.target.value)} />
      <input required placeholder="Lớp" value={stuClass} onChange={e => setStuClass(e.target.value)} />
      <button type="submit">Thêm học sinh</button>
    </form>
  );
}
