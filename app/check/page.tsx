"use client";
import { useState } from 'react';
import Link from 'next/link';
import MagicButton from '@/components/ui/MagicButton';
import { FaLocationArrow } from 'react-icons/fa6';
import { Spotlight } from '@/components/ui/Spotlight';
import { TextGenerateEffect } from '@/components/ui/TextGenerateEffect';
import { PlaceholdersAndVanishInput } from '@/components/ui/PlaceholdersAndVanishInput';

const Check = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkedUrl, setCheckedUrl] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    setCheckedUrl(url); // Display the URL being checked

    const apiUrl = 'http://localhost:5000/check-url';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      setError('There was an error checking the URL.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resultColor = result.includes('unsafe') ? 'text-red-600' : result.includes('safe') ? 'text-green-600' : '';

  return (
    <div className="min-h-screen relative pb-20 pt-36 flex flex-col justify-between overflow-hidden">
      {/* Spotlights */}
      <div>
        <Spotlight
          className="absolute -top-40 -left-10 md:-left-32 md:-top-20 h-[60vh] w-[60vw] max-w-screen overflow-hidden"
          fill="white"
        />
        <Spotlight
          className="absolute top-10 left-full h-[40vh] w-[40vw] max-w-screen overflow-hidden"
          fill="purple"
        />
        <Spotlight
          className="absolute left-80 top-28 h-[50vh] w-[50vw] max-w-screen overflow-hidden"
          fill="blue"
        />
      </div>

      {/* Background Grid */}
      <div
        className="absolute inset-0 flex items-center justify-center dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]"
      >
        <div
          className="absolute inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center relative my-20 z-10 flex-grow">
        <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
          Online Phishing Detection System
        </p>

        <TextGenerateEffect
          words="PhishDetective"
          className="text-center text-[40px] md:text-5xl lg:text-6xl"
        />

        {/* Replaced Form with PlaceholdersAndVanishInput */}
        <PlaceholdersAndVanishInput
          placeholders={[
            "Enter any link",
          ]}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />

        {/* Display the URL being checked and the status/result */}
        {checkedUrl && (
          <p className="mt-4 text-center text-gray-600">
            {loading ? `Checking ${checkedUrl}...` : checkedUrl}
          </p>
        )}
        {result && (
          <p className={`mt-2 text-center text-2xl ${resultColor}`}>
            {result}
          </p>
        )}
        {error && (
          <p className="mt-2 text-red-600 text-center text-2xl">
            {error}
          </p>
        )}
      </div>

      {/* Navigation Button at the bottom */}
      <div className="flex justify-center mb-10">
        <Link href="/">
          <MagicButton
            title="Go back to Home"
            icon={<FaLocationArrow />}
            position="right"
          />
        </Link>
      </div>
    </div>
  );
};

export default Check;
