# 🚀 Hướng dẫn Setup Nhanh

## 📥 Bước 1: Lấy Code về máy

### Cách 1: Download ZIP từ GitHub
1. Tạo repository mới trên GitHub: `tiktok-video-manager`
2. Upload toàn bộ code từ workspace
3. Download ZIP về máy và extract

### Cách 2: Clone trực tiếp
```bash
git clone https://github.com/your-username/tiktok-video-manager.git
cd tiktok-video-manager
```

## ⚡ Bước 2: Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install
# hoặc: yarn install
# hoặc: bun install

# Chạy development
npm run dev

# Mở http://localhost:3000
```

## 🌐 Bước 3: Deploy lên domain riêng

### Option A: Vercel (Dễ nhất)
1. Vào [vercel.com](https://vercel.com)
2. Connect GitHub repository
3. Deploy tự động
4. Thêm custom domain trong Settings

### Option B: Script tự động
```bash
# Chạy script deploy
./deploy.sh

# Chọn option phù hợp:
# 1 = Vercel
# 2 = Netlify
# 3 = Docker
```

### Option C: VPS riêng
```bash
# Trên server
git clone https://github.com/your-username/tiktok-video-manager.git
cd tiktok-video-manager
npm install
npm run build
npm start

# Setup Nginx reverse proxy port 3000
# Setup SSL với Let's Encrypt
```

## 🔧 Bước 4: Tùy chỉnh

### Đổi tên ứng dụng
- File: `src/app/layout.tsx` → `title`
- File: `package.json` → `name`

### Đổi màu sắc
- File: `tailwind.config.ts` → colors
- File: `src/app/globals.css` → CSS variables

### Thêm logo
- Thêm file logo vào: `public/logo.png`
- Import và sử dụng trong components

## 📊 Tính năng có sẵn

✅ **Click tracking** - Đếm số lần click
✅ **Admin panel** - Thêm/xóa video
✅ **Search & Filter** - Tìm kiếm thông minh
✅ **Analytics** - Dashboard thống kê
✅ **Categories** - Phân loại video
✅ **Responsive** - Tương thích mobile

## 🛟 Troubleshooting

**Lỗi build:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Port 3000 đang dùng:**
```bash
npm run dev -- -p 3001
```

**Data bị mất:**
- LocalStorage chỉ lưu local
- Cần database thật cho production

## 📞 Hỗ trợ

- 📧 Email: your-email@domain.com
- 🐛 Issues: GitHub Issues
- 📖 Docs: README.md chi tiết

---

**🎯 Mục tiêu: Từ code → Website live trong 10 phút!**
