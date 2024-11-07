import { useStages } from '../hooks/useStages';
import { Heart, Footprints, Clock, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StageListPageProps {
  filter?: 'all' | 'my' | 'popular' | 'new';
}

export function StageListPage({ filter = 'all' }: StageListPageProps) {
  const { stages, loading, hasMore, loadMore } = useStages(filter);
  const navigate = useNavigate();

  if (loading && stages.length === 0) {
    return (
      <div className="flex-1 ml-64 p-8 flex justify-center items-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 ml-64 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {stages.map((stage) => (
          <div
            key={stage.id}
            onClick={() => navigate(`/play/${stage.id}`)}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center space-x-6"
          >
            <div className="w-20 h-20 bg-[#bdc3c7] rounded-lg flex-shrink-0" />
            
            <div className="flex-grow">
              <h3 className="text-xl font-semibold mb-3">{stage.stageName}</h3>
              <p className="text-gray-600 mb-3">{stage.stageQuestion}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <span className="flex items-center space-x-1">
                    <Heart size={18} />
                    <span>{stage.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Footprints size={18} />
                    <span>{stage.playCount}</span>
                  </span>
                </div>
                
                <div className="flex space-x-4">
                  <span className="flex items-center space-x-1">
                    <Clock size={18} />
                    <span>{stage.timer}s</span>
                  </span>
                  {/* Clear rate will be calculated from user_stage_actions */}
                  <span className="flex items-center space-x-1">
                    <Trophy size={18} />
                    <span>--%</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {hasMore && (
          <button
            onClick={loadMore}
            className="block mx-auto px-6 py-2 bg-[#1abc9c] text-white rounded-lg hover:bg-[#16a085] transition-colors"
          >
            もっとみる
          </button>
        )}
      </div>
    </div>
  );
}