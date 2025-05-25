'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { addVideo, getCategories } from '@/lib/videoStore';

interface AddVideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVideoAdded: () => void;
}

export function AddVideoDialog({ open, onOpenChange, onVideoAdded }: AddVideoDialogProps) {
  const [formData, setFormData] = useState({
    mainLink: '',
    liteLink: '',
    duration: '60 phút',
    category: 'Entertainment'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = getCategories();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!formData.mainLink || !formData.liteLink) {
        alert('Vui lòng điền đầy đủ thông tin Link và Lite Link');
        return;
      }

      // Add the video
      addVideo(formData);

      // Reset form
      setFormData({
        mainLink: '',
        liteLink: '',
        duration: '60 phút',
        category: 'Entertainment'
      });

      onVideoAdded();
      onOpenChange(false);

    } catch (error) {
      console.error('Error adding video:', error);
      alert('Có lỗi xảy ra khi thêm video');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm Video Mới</DialogTitle>
          <DialogDescription>
            Thêm link TikTok video mới vào danh sách
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="mainLink" className="text-sm font-medium">
              Link TikTok chính *
            </label>
            <Input
              id="mainLink"
              placeholder="https://www.tiktok.com/@user/video/..."
              value={formData.mainLink}
              onChange={(e) => setFormData(prev => ({ ...prev, mainLink: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="liteLink" className="text-sm font-medium">
              Link TikTok Lite *
            </label>
            <Input
              id="liteLink"
              placeholder="https://lite.tiktok.com/t/..."
              value={formData.liteLink}
              onChange={(e) => setFormData(prev => ({ ...prev, liteLink: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="duration" className="text-sm font-medium">
              Thời lượng
            </label>
            <select
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="30 phút">30 phút</option>
              <option value="60 phút">60 phút</option>
              <option value="90 phút">90 phút</option>
              <option value="120 phút">120 phút</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Danh mục
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
              <option value="New Category">+ Tạo danh mục mới</option>
            </select>
          </div>

          {formData.category === 'New Category' && (
            <div className="space-y-2">
              <label htmlFor="newCategory" className="text-sm font-medium">
                Tên danh mục mới
              </label>
              <Input
                id="newCategory"
                placeholder="Nhập tên danh mục..."
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              />
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang thêm...' : 'Thêm Video'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
