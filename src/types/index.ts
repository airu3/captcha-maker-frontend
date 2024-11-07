export interface Stage {
  id: string;
  userId: string;
  stageName: string;
  stageQuestion: string;
  questionDetails?: string;
  authorComment?: string;
  timer: number;
  likes: number;
  playCount: number;
  createdAt: Date;
}

export interface StageImage {
  stageId: string;
  sequenceNo: number;
  imagePath: string;
  isCorrect: boolean;
}

export interface UserStageAction {
  userId: string;
  stageId: string;
  isCleared: boolean;
  isLiked: boolean;
  actionDate: Date;
}