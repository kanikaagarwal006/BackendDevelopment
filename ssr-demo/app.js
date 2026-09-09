const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const students = [
  { name: 'Aarav', branch: 'CSE' },
  { name: 'Diya', branch: 'ECE' },
  { name: 'Rohan', branch: 'IT' }
];

app.get('/', (req, res) => {
  res.render('home', { name: 'Aarav', students });
});

app.get('/students', (req, res) => {
  res.render('students', { students });
});

app.get('/about', (req, res) => {
  res.render('about', {
    course: 'Backend Development',
    lecturer: 'Dr Prateek. Raj Gautam'
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));