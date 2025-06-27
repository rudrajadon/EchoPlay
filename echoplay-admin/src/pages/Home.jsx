import React from 'react';

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] text-center">
      <img
        src="/echoplay_logo_small.png"
        alt="EchoPlay"
        className="w-40"
      />
      <h1 className="text-4xl font-bold text-gray-800 mt-8">Welcome to EchoPlay Admin</h1>
      <p className="text-gray-600 mt-2">Manage your albums and songs here.</p>
    </div>
  );
};

export default Home;
