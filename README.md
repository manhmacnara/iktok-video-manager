# 🎬 TikTok Video Management Platform

Một nền tảng quản lý video TikTok hiện đại với đầy đủ tính năng theo dõi, phân tích và quản trị.

## ✨ Tính năng chính

### 🔗 Quản lý Video
- **Danh sách video**: Hiển thị cả link TikTok thường và TikTok Lite
- **Click tracking**: Theo dõi thời gian và số lần click cho mỗi video
- **Phân loại**: Tổ chức video theo danh mục (Entertainment, Gaming, Music, Food...)
- **Thời lượng**: Quản lý video theo thời lượng (30, 60, 90, 120 phút)

### 🔍 Tìm kiếm & Lọc
- **Tìm kiếm thông minh**: Tìm theo nội dung, danh mục, thời lượng
- **Lọc theo danh mục**: Hiển thị video theo từng category
- **Sắp xếp linh hoạt**: Theo ngày, lượt click, hoặc thời lượng
- **Hiển thị kết quả**: Đếm số video phù hợp với bộ lọc

### 🛡️ Admin Panel
- **Thêm video mới**: Form thêm video với validation
- **Xóa video**: Xóa video với xác nhận an toàn
- **Quản lý danh mục**: Tạo và quản lý các category
- **Toggle admin mode**: Bật/tắt chế độ quản trị dễ dàng

### 📊 Analytics Dashboard
- **Thống kê tổng quan**: Số video, tổng click, danh mục, click trung bình
- **Top videos**: Xếp hạng video theo lượt click
- **Phân tích danh mục**: Hiệu suất từng category
- **Video mới nhất**: Theo dõi video vừa thêm
- **Thao tác nhanh**: Shortcuts đến các chức năng chính

### 💾 Lưu trữ dữ liệu
- **Local Storage**: Dữ liệu được lưu trên trình duyệt
- **Persistence**: Dữ liệu không bị mất khi refresh
- **Real-time updates**: Cập nhật ngay lập tức

## 🚀 Cài đặt và Chạy Local

### Yêu cầu hệ thống
- **Node.js**: >= 18.0.0
- **npm/yarn/bun**: Package manager
- **Git**: Để clone repository

### 1. Clone repository
```bash
git clone https://github.com/your-username/tiktok-video-manager.git
cd tiktok-video-manager
```

### 2. Cài đặt dependencies
```bash
# Sử dụng npm
npm install

# Hoặc yarn
yarn install

# Hoặc bun (recommended)
bun install
```

### 3. Chạy development server
```bash
# npm
npm run dev

# yarn
yarn dev

# bun
bun dev
```

### 4. Mở trình duyệt
Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

### 5. Build cho production
```bash
# npm
npm run build
npm start

# yarn
yarn build
yarn start

# bun
bun run build
bun start
```

## 🌐 Deployment

### Option 1: Vercel (Recommended)
1. **Tạo tài khoản**: [vercel.com](https://vercel.com)
2. **Connect GitHub**: Kết nối với repository
3. **Import Project**: Chọn repo tiktok-video-manager
4. **Deploy**: Vercel tự động build và deploy
5. **Custom Domain**: Thêm domain riêng trong Settings

```bash
# Hoặc dùng Vercel CLI
npm i -g vercel
vercel --prod
```

### Option 2: Netlify
1. **Tạo tài khoản**: [netlify.com](https://netlify.com)
2. **New site from Git**: Import từ GitHub
3. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. **Deploy**: Netlify tự động build
5. **Domain settings**: Thêm custom domain

### Option 3: Self-hosted VPS

#### Cài đặt trên Ubuntu/CentOS
```bash
# 1. Clone code trên server
git clone https://github.com/your-username/tiktok-video-manager.git
cd tiktok-video-manager

# 2. Cài đặt Node.js (nếu chưa có)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Cài đặt dependencies và build
npm install
npm run build

# 4. Chạy production
npm start
```

#### Setup Nginx Reverse Proxy
```nginx
# /etc/nginx/sites-available/tiktok-manager
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/tiktok-manager /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Setup SSL với Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

#### Setup PM2 cho process management
```bash
npm install -g pm2
pm2 start npm --name "tiktok-manager" -- start
pm2 startup
pm2 save
```

### Option 4: Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build và chạy Docker
docker build -t tiktok-manager .
docker run -p 3000:3000 tiktok-manager
```

## 📁 Cấu trúc Project

```
tiktok-video-manager/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── dashboard/       # Trang analytics
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Trang chính
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── VideoTable.tsx   # Bảng video chính
│   │   └── AddVideoDialog.tsx # Dialog thêm video
│   └── lib/                 # Utilities
│       ├── utils.ts         # Helper functions
│       └── videoStore.ts    # Data management
├── public/                  # Static files
├── next.config.js          # Next.js config
├── tailwind.config.ts      # Tailwind config
├── package.json            # Dependencies
└── README.md              # Documentation
```

## 🔧 Cấu hình

### Environment Variables
Tạo file `.env.local` (optional):
```env
# Nếu cần custom configuration
NEXT_PUBLIC_APP_NAME="TikTok Video Manager"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### Tùy chỉnh thiết kế
- **Colors**: Sửa trong `tailwind.config.ts`
- **Fonts**: Thay đổi trong `src/app/layout.tsx`
- **Logo**: Thêm vào `public/` và import trong components

### Backup dữ liệu
```javascript
// Export dữ liệu (chạy trong Console)
const data = localStorage.getItem('tiktok_videos_data');
console.log(data); // Copy và lưu

// Import dữ liệu
localStorage.setItem('tiktok_videos_data', 'your-backup-data');
```

## 🛠️ Development

### Tech Stack
- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React
- **Storage**: Browser LocalStorage
- **Build**: Turbopack (Next.js)

### Scripts có sẵn
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Code linting
npm run type-check   # TypeScript checking
```

### Thêm tính năng mới
1. **Components**: Tạo trong `src/components/`
2. **Pages**: Thêm trong `src/app/`
3. **Types**: Định nghĩa trong `src/lib/types.ts`
4. **Utilities**: Thêm vào `src/lib/`

## 🔍 Troubleshooting

### Lỗi thường gặp

**1. Build fails**
```bash
# Xóa cache và rebuild
rm -rf .next node_modules
npm install
npm run build
```

**2. Port 3000 đã được sử dụng**
```bash
# Chạy trên port khác
npm run dev -- -p 3001
```

**3. Data mất sau khi deploy**
- LocalStorage chỉ lưu trên trình duyệt local
- Cần implement database cho production (PostgreSQL, MongoDB...)

**4. CSS không load**
```bash
# Rebuild Tailwind
npm run build
```

## 📝 License

MIT License - Xem file `LICENSE` để biết thêm chi tiết.

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Tạo Pull Request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/tiktok-video-manager/issues)
- **Documentation**: Xem README này
- **Email**: your-email@domain.com

## 🚀 Roadmap

### Tính năng sắp tới
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication
- [ ] Video preview thumbnails
- [ ] Export/Import JSON
- [ ] API endpoints
- [ ] Real-time collaboration
- [ ] Video tags system
- [ ] Advanced analytics

---

**⭐ Nếu project hữu ích, hãy star trên GitHub!**

**🔗 Demo**: [https://your-domain.com](https://your-domain.com)
