import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Grid } from '../components/Grid';
import { Timer } from '../components/Timer';
import { Heart, MessageSquare } from 'lucide-react';
import { Stage, StageImage } from '../types';

export function PlayPage() {
  const { id } = useParams<{ id: string }>();
  const [stage, setStage] = useState<Stage | null>(null);
  const [images, setImages] = useState<StageImage[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchStage = async () => {
      if (!id) return;

      try {
        const stageDoc = await getDoc(doc(db, 'stages', id));
        if (stageDoc.exists()) {
          setStage({ id: stageDoc.id, ...stageDoc.data() } as Stage);
          
          // Increment play count
          await updateDoc(doc(db, 'stages', id), {
            playCount: increment(1)
          });
        }

        // Fetch stage images
        const imagesSnapshot = await getDoc(doc(db, 'stage_images', id));
        if (imagesSnapshot.exists()) {
          setImages(imagesSnapshot.data().images);
        }
      } catch (error) {
        console.error('Error fetching stage:', error);
      }
    };

    fetchStage();
  }, [id]);

  const handleTimeUp = () => {
    alert('時間切れです！');
  };

  const handleLike = async () => {
    if (!id || !stage) return;

    try {
      await updateDoc(doc(db, 'stages', id), {
        likes: increment(isLiked ? -1 : 1)
      });
      setStage(prev => prev ? { ...prev, likes: prev.likes + (isLiked ? -1 : 1) } : null);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  if (!stage) {
    return (
      <div className="flex-1 ml-64 p-5 flex justify-center items-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 ml-64 p-5 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px] space-y-6">
        <h1 className="text-2xl font-bold text-center">{stage.stageQuestion}</h1>
        
        <Timer duration={stage.timer} onTimeUp={handleTimeUp} />
        
        <Grid
          selectedItems={selectedItems}
          onSelect={(index) => setSelectedItems([...selectedItems, index])}
          images={images.map(img => img.imagePath)}
        />
        
        <div className="flex items-center justify-center space-x-4">
          <div className="w-10 h-10 bg-[#34495e] rounded-full" />
          <span className="text-lg">作成者</span>
        </div>
        
        <div className="flex justify-center space-x-8">
          <button
            onClick={handleLike}
            className="flex items-center space-x-2 text-lg hover:text-red-500"
          >
            <Heart className={isLiked ? 'fill-current text-red-500' : ''} />
            <span>{stage.likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-lg hover:text-blue-500">
            <MessageSquare />
          </button>
        </div>
      </div>
    </div>
  );
}