
export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'kids' | 'adults' | 'ielts';
  features: string[];
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum LearningType {
  PRIVATE = 'Private',
  GROUP = 'Group'
}
