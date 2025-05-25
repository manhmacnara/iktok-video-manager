'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { VideoData, getVideos, getCategories } from '@/lib/videoStore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, Users, Video, Calendar } from 'lucide-react';

export default function Dashboard() {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setVideos(getVideos());
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Đang tải...</div>;
  }

  // Calculate statistics
  const totalVideos = videos.length;
  const totalClicks = videos.reduce((sum, video) => sum + video.clickCount, 0);
  const categoryCounts = getCategories().map(category => ({
    name: category,
    count: videos.filter(v => v.category === category).length,
    clicks: videos.filter(v => v.category === category).reduce((sum, v) => sum + v.clickCount, 0)
  }));

  const topVideos = videos
    .sort((a, b) => b.clickCount - a.clickCount)
    .slice(0, 5);

  const recentVideos = videos
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="antialiased">
      {/* Header */}
      <header className="">
        <div className="container px-4 py-4 mx-auto border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-blue-700 hover:text-blue-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại danh sách video
            </Link>
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container px-4 py-6 mx-auto">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng số video</p>
                <p className="text-2xl font-bold text-gray-900">{totalVideos}</p>
              </div>
              <Video className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng lượt click</p>
                <p className="text-2xl font-bold text-gray-900">{totalClicks}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Số danh mục</p>
                <p className="text-2xl font-bold text-gray-900">{categoryCounts.length}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Click TB/Video</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalVideos > 0 ? (totalClicks / totalVideos).toFixed(1) : '0'}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Videos */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Top Video (Theo lượt click)</h2>
            <div className="space-y-3">
              {topVideos.map((video, index) => (
                <div key={video.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-500">#{index + 1}</span>
                    <div>
                      <p className="text-sm font-medium truncate max-w-xs">
                        {video.mainLink.split('/').pop()?.substring(0, 20)}...
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {video.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{video.clickCount} clicks</p>
                    <p className="text-xs text-gray-500">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Statistics */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Thống kê theo danh mục</h2>
            <div className="space-y-3">
              {categoryCounts.map((category) => (
                <div key={category.name} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-gray-600">{category.count} video</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{category.clicks} clicks</p>
                    <p className="text-xs text-gray-500">
                      {category.count > 0 ? (category.clicks / category.count).toFixed(1) : '0'} TB/video
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Videos */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Video mới nhất</h2>
            <div className="space-y-3">
              {recentVideos.map((video) => (
                <div key={video.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium truncate max-w-xs">
                      {video.mainLink.split('/').pop()?.substring(0, 25)}...
                    </p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {video.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {video.duration}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{video.createdAt}</p>
                    <p className="text-sm font-medium">{video.clickCount} clicks</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Thao tác nhanh</h2>
            <div className="space-y-3">
              <Link href="/">
                <Button className="w-full justify-start" variant="outline">
                  <Video className="w-4 h-4 mr-2" />
                  Xem danh sách video
                </Button>
              </Link>

              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Xuất báo cáo
              </Button>

              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Quản lý danh mục
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
