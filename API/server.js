const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// 連接到 MongoDB
mongoose.connect(process.env.MongoDBConnectionString);

// 配置 CORS 允許多個來源
const allowedOrigins = ['http://localhost:3000',
    'https://prj-questionnaire.vercel.app',
    'https://prj-questionnaire-front-end.vercel.app',
    '*'];

app.use(cors({
    origin: function (origin, callback) {
        // 允許所有本地請求
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// 使用 body-parser 中間件解析 JSON 請求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 定義資料模型
const learningForSchema = new mongoose.Schema({
    LearningFor: String
});
const preferToSchema = new mongoose.Schema({
    PreferTo: String
});
const givingTimeSchema = new mongoose.Schema({
    GivingTime: String
});
const learningGoalSchema = new mongoose.Schema({
    LearningGoaL: String
});
const preferLearningWaySchema = new mongoose.Schema({
    LearningWay: String,
    Description: String
});
const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    github: String,
    languages: [String],
    tools: [String],
    skills: [String],
    talents: [String],
    intro: String,
    comments: String,
    selectedLearningFor: [String],
    selectedPreferTo: [String],
    selectedGivingTime: String,
    selectedLearningGoal: [String],
    selectedPreferLearningWay: [String]
});

const LearningFor = mongoose.model('LearningFor', learningForSchema, 'LearningFor');
const PreferTo = mongoose.model('PreferTo', preferToSchema, 'PreferTo');
const GivingTime = mongoose.model('GivingTime', givingTimeSchema, 'GivingTime');
const LearningGoal = mongoose.model('LearningGoal', learningGoalSchema, 'LearningGoal');
const PreferLearningWay = mongoose.model('PreferLearningWay', preferLearningWaySchema, 'PreferLearningWay');
const Member = mongoose.model('Member', memberSchema, 'Member');


// 設置靜態文件目錄
app.use(express.static('public'));

// 定義 API 端點
app.get('/api/learning-for', async (req, res) => {
    try {
        const data = await LearningFor.find({});
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get('/prefer-to', async (req, res) => {
    try {
        const data = await PreferTo.find({});
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get('/giving-time', async (req, res) => {
    try {
        const data = await GivingTime.find({});
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get('/learning-goal', async (req, res) => {
    try {
        const data = await LearningGoal.find({});
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.get('/perfer-learning-way', async (req, res) => {
    try {
        const data = await PreferLearningWay.find({});
        res.json(data);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.post('/form', async (req, res) => {
    try {
        // 收到的資料
        const member = new Member(req.body);
        const savedMember = await member.save();
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

