const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. KẾT NỐI DATABASE (Thay <password> bằng mật khẩu bạn tạo ở Bước 1)
const mongoURI = 'mongodb+srv://admin:123@admin.j7nxp5w.mongodb.net/?appName=admin';
mongoose.connect(mongoURI)
  .then(() => console.log('Đã kết nối thành công với MongoDB!'))
  .catch(err => console.error('Lỗi kết nối DB:', err));

// 2. TẠO SCHEMA (Khuôn mẫu cho dữ liệu)
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});
const UserModel = mongoose.model('users', UserSchema);

// 3. API LẤY DANH SÁCH (READ) - Lấy từ DB thật
app.get('/api/users', async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

// 4. API THÊM MỚI (CREATE) - Lưu vào DB thật
app.post('/api/users', async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();
  res.json(newUser);
});

app.listen(5000, () => console.log('Server chạy ở cổng 5000'));