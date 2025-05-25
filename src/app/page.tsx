'use client';

import { useState } from 'react';
import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { VideoTable } from '@/components/VideoTable';
import { AddVideoDialog } from '@/components/AddVideoDialog';

export default function Home() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleVideoAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="antialiased">
      {/* Header */}
      <header className="">
        <div className="container px-4 py-4 mx-auto border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Link
              href="/list-video"
              className="text-blue-700 hover:text-blue-800 flex items-center justify-start gap-1 font-semibold text-lg"
            >
              List video
            </Link>

            <Link
              href="/dashboard"
              className="text-blue-700 hover:text-blue-800 flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container px-4 py-6 mx-auto">
        <VideoTable key={refreshKey} onAddVideo={() => setShowAddDialog(true)} />
      </div>

      {/* Add Video Dialog */}
      <AddVideoDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onVideoAdded={handleVideoAdded}
      />
    </div>
  );
}
