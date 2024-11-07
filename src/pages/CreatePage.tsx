import { useState } from 'react';
import { Grid } from '../components/Grid';
import { Timer } from '../components/Timer';

export function CreatePage() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(60);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);

  const handleImageUpload = () => {
    // In a real implementation, this would open a file picker
    alert('画像を挿入します');
  };

  const handleSave = () => {
    if (!title) {
      alert('タイトルを入力してください');
      return;
    }
    // In a real implementation, this would save to a backend
    alert('ステージが保存されました');
  };

  return (
    <div className="flex-1 ml-64 p-5 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-[400px] space-y-6">
        <h1 className="text-2xl font-bold text-center">ステージを作成</h1>
        
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトルを入力してください"
          className="w-full p-2 border rounded"
        />
        
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          placeholder="タイマーを設定してください（秒）"
          className="w-full p-2 border rounded"
        />
        
        <Timer duration={duration} />
        
        <Grid
          isCreating
          images={selectedImages}
          onSelect={(index) => setCorrectAnswer(index)}
        />
        
        <div className="flex justify-around">
          <button
            onClick={handleImageUpload}
            className="bg-[#3498db] text-white px-4 py-2 rounded hover:bg-[#2980b9]"
          >
            画像を入れる
          </button>
          <button
            onClick={() => setCorrectAnswer(null)}
            className="bg-[#3498db] text-white px-4 py-2 rounded hover:bg-[#2980b9]"
          >
            正解の枠を決める
          </button>
        </div>
        
        <button
          onClick={handleSave}
          className="w-full bg-[#3498db] text-white px-4 py-2 rounded hover:bg-[#2980b9]"
        >
          保存
        </button>
      </div>
    </div>
  );
}