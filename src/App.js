import React, { useState, useEffect } from 'react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './components/ui/card';
import { AlertCircle, Twitter, Copy, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TwitterThreadUnroller = () => {
  const [url, setUrl] = useState('');
  const [unrolledThread, setUnrolledThread] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const unrollThread = async () => {
    setLoading(true);
    setError('');
    setUnrolledThread([]);

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponse = [
        { id: 1, content: "1/5 Let's talk about the importance of staying hydrated! 💧", likes: 120, retweets: 45 },
        { id: 2, content: "2/5 Water makes up about 60% of your body weight and is crucial for many bodily functions.", likes: 98, retweets: 32 },
        { id: 3, content: "3/5 Proper hydration can improve physical performance, boost energy levels, and aid in weight loss.", likes: 105, retweets: 38 },
        { id: 4, content: "4/5 Aim to drink at least 8 glasses (64 ounces) of water per day. More if you're active or in hot weather.", likes: 87, retweets: 29 },
        { id: 5, content: "5/5 Remember, your body needs water. Make staying hydrated a daily habit for better health! 🚰💪", likes: 150, retweets: 60 },
      ];

      setUnrolledThread(mockResponse);
    } catch (err) {
      setError('Failed to unroll thread. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const text = unrolledThread.map(tweet => tweet.content).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold text-center flex items-center justify-center">
              <Twitter className="mr-2" />
              Twitter Thread Unroller
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter Twitter thread URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-grow text-lg"
              />
              <Button onClick={unrollThread} disabled={loading} variant="default">
                {loading ? 'Unrolling...' : 'Unroll'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md shadow"
            role="alert"
          >
            <div className="flex items-center">
              <AlertCircle className="mr-2" />
              <p>{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {unrolledThread.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <CardTitle className="text-2xl font-semibold">Unrolled Thread</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {unrolledThread.map((tweet, index) => (
                  <motion.div
                    key={tweet.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-4 last:mb-0 bg-white p-4 rounded-lg shadow"
                  >
                    <p className="text-gray-800">{tweet.content}</p>
                    <div className="mt-2 text-sm text-gray-500 flex items-center space-x-4">
                      <span>❤️ {tweet.likes}</span>
                      <span>🔁 {tweet.retweets}</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
              <CardFooter className="bg-gray-50 flex justify-end space-x-2 p-4">
                <Button onClick={copyToClipboard} className="bg-green-500 hover:bg-green-600 text-white">
                  <Copy className="mr-2 h-4 w-4" /> {copied ? 'Copied!' : 'Copy Text'}
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TwitterThreadUnroller;