import { useEffect, useState } from 'react';
import { MessageSquare } from 'lucide-react';

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    setTimeout(() => {
      if (mounted) {
        setShow(false);
      }
    }, 2000);

    return () => {
      mounted = false;
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 text-white flex items-center justify-center z-50">
      <div className="animate-pulse flex flex-col items-center">
        <MessageSquare className="w-24 h-24 text-orange-500" />
        <h1 className="text-4xl font-bold mt-4 text-gray-100">Xeddit</h1>
        <p className="text-lg mt-2 text-gray-400">Created By A3x-parvez</p>
      </div>
    </div>
  );
}
