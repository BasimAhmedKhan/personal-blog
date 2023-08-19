import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), "src", "data", "blogs.json");

// schema
// {
//   id: 1,
//   userEmail: "john.doe@gmail",
//   title: "My first blog",
//   content: "This is my first blog",
//   createdAt: "2021-09-01T00:00:00.000Z",
// }

export function getAll () {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

export function create (blog) {
  const data = getAll();
  const lastBlog = data[data.length - 1];
  const lastId = lastBlog?.id ?? 0;
  const newBlog = {
    ...blog,
    id: lastId + 1,
    createdAt: new Date().toISOString(),
  };
  data.push(newBlog);
  fs.writeFileSync(filePath, JSON.stringify(data));
  return newBlog;
}

export function getById (id) {
  const data = getAll();
  return data.find(p => p.id === Number(id));
}

export function getByUserEmail (userEmail) {
  const data = getAll();
  return data.filter(p => p.userEmail.toLowerCase() === userEmail.toLowerCase());
}

export function deleteById (id) {
  const data = getAll();
  const index = data.findIndex(p => p.id === Number(id));
  const out = data[index];
  if (index === -1) return false;
  data.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(data));
  return out;
}
