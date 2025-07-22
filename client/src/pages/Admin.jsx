import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [blogs, setBlogs] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [form, setForm] = useState({ type: 'blog', title: '', content: '' });

  const fetchData = async () => {
    const blogsRes = await fetch('http://localhost:5000/blogs');
    setBlogs(await blogsRes.json());
    const progRes = await fetch('http://localhost:5000/programs');
    setPrograms(await progRes.json());
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = form.type === 'blog' ? 'blogs' : 'programs';
    await fetch(`http://localhost:5000/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ ...form, title: '', content: '' });
    fetchData();
  };

  const deleteItem = async (type, id) => {
    await fetch(`http://localhost:5000/${type}/${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="blog">Blog</option>
          <option value="program">Program</option>
        </select>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <h3>Blogs</h3>
        {blogs.map((b) => (
          <div key={b.id}>
            <strong>{b.title}</strong> - {b.content}
            <button onClick={() => deleteItem('blogs', b.id)}>Delete</button>
          </div>
        ))}

        <h3 style={{ marginTop: '2rem' }}>Programs</h3>
        {programs.map((p) => (
          <div key={p.id}>
            <strong>{p.title}</strong> - {p.content}
            <button onClick={() => deleteItem('programs', p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
