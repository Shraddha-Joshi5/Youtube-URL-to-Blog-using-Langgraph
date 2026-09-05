"use client";

import { useState, FormEvent } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [blogContent, setBlogContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setBlogContent(null);

    try {
      // In GitHub Codespaces, 127.0.0.1 typically resolves locally. 
      // For production, replace this with your deployed backend URL (e.g., via process.env.NEXT_PUBLIC_API_URL)
      const response = await fetch("http://127.0.0.1:8000/api/generate-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to generate blog.");
      }

      setBlogContent(data.blog_content);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            YouTube to Blog Converter
          </h1>
          <p className="mt-2 text-gray-600">
            Paste a YouTube URL below to extract the transcript and write a full blog post using AI.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-black"
            />
            <button
              type="submit"
              disabled={loading || !url}
              className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex justify-center items-center"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Video & Writing Blog...
                </span>
              ) : (
                "Generate Blog Post"
              )}
            </button>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Result Area */}
        {blogContent && (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            {/* The 'prose' class from Tailwind Typography formats the raw HTML properly */}
            <div className="prose prose-blue max-w-none text-black">
              <ReactMarkdown>
                {blogContent}
              </ReactMarkdown>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}