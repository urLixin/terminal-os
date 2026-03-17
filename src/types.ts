export type Theme = 'green' | 'pink' | 'purple' | 'blue';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface FileSystemItem {
  name: string;
  type: 'file' | 'dir';
  content?: string;
  children?: FileSystemItem[];
}
