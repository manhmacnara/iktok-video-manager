'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { ExternalLink, Search, Filter, Plus, Trash2 } from "lucide-react";
import { type VideoData, getVideos, trackVideoClick, removeVideo, getCategories } from '@/lib/videoStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface VideoTableProps {
  onAddVideo?: () => void;
}

export function VideoTable({ onAddVideo }: VideoTableProps) {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'clicks' | 'duration'>('date');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setVideos(getVideos());
  }, []);

  const handleVideoClick = (videoId: number, linkType: 'main' | 'lite', url: string) => {
    const updatedVideos = trackVideoClick(videoId, linkType);
    setVideos(updatedVideos);

    // Open the link
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleRemoveVideo = (videoId: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa video này?')) {
      const updatedVideos = removeVideo(videoId);
      setVideos(updatedVideos);
    }
  };

  // Filter and sort videos
  const filteredVideos = videos
    .filter(video => {
      const matchesSearch = video.mainLink.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.duration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (video.category || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || video.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'clicks':
          return b.clickCount - a.clickCount;
        case 'duration':
          return a.duration.localeCompare(b.duration);
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const categories = getCategories();

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm video..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả danh mục</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'clicks' | 'duration')}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sắp xếp theo ngày</option>
            <option value="clicks">Sắp xếp theo lượt click</option>
            <option value="duration">Sắp xếp theo thời lượng</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button
            variant={isAdmin ? "default" : "outline"}
            size="sm"
            onClick={() => setIsAdmin(!isAdmin)}
          >
            Admin Mode
          </Button>

          {isAdmin && onAddVideo && (
            <Button
              onClick={onAddVideo}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Thêm Video
            </Button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500">
        Hiển thị {filteredVideos.length} / {videos.length} video
      </div>

      {/* Video Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 pr-0">Link</th>
              <th scope="col" className="px-6 py-3 pr-0">Lite</th>
              <th scope="col" className="px-6 py-3">Duration</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Clicks</th>
              <th scope="col" className="px-6 py-3">Last Clicked</th>
              {isAdmin && <th scope="col" className="px-6 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredVideos.map((video) => (
              <tr key={video.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 pr-0">
                  <button
                    onClick={() => handleVideoClick(video.id, 'main', video.mainLink)}
                    className="text-blue-600 hover:text-teal-800 visited:text-purple-600 flex items-center justify-start gap-1 cursor-pointer"
                  >
                    Open <ExternalLink className="w-3 h-3" />
                  </button>
                </td>
                <td className="px-6 pr-0 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleVideoClick(video.id, 'lite', video.liteLink)}
                    className="text-blue-600 hover:text-teal-800 visited:text-purple-600 flex items-center justify-start gap-1 cursor-pointer"
                  >
                    Open Lite <ExternalLink className="w-3 h-3" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {video.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="secondary" className="text-xs">
                    {video.category || 'Uncategorized'}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="outline" className="text-xs">
                    {video.clickCount}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {video.lastClicked}
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveVideo(video.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Không tìm thấy video nào phù hợp với bộ lọc.
        </div>
      )}
    </div>
  );
}
