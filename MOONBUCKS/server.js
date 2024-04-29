const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
app.use(bodyParser.json());

// 게시글 목록 가져오기
app.get('/api/posts', (req, res) => {
    fs.readFile('mock/posts.db.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading posts data.');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


const users = [
    { id: 1, username: 'user1', password: bcrypt.hashSync('pass1', 10) },
    { id: 2, username: 'user2', password: bcrypt.hashSync('pass2', 10) }
];

// 로그인 라우트
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send('Authentication failed');
    }

    const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = router;