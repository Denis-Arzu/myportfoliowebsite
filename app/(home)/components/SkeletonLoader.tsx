"use client";
import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full h-40 sm:h-56 p-4">
      <div className="skeleton" style={{ height: 20, width: '60%', borderRadius: 6 }} />
      <div className="skeleton" style={{ height: 14, width: '40%', marginTop: 8, borderRadius: 6 }} />
      <div className="skeleton" style={{ height: 180, width: '100%', marginTop: 12, borderRadius: 8 }} />
    </div>
  );
};

export default SkeletonLoader;
