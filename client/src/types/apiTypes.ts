
export interface Server {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: string;
  num_members: string;
  banner: string;
  owner: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface Channel {
  id: number;
  name: string;
  topic: string;
  owner: number;
  server: number;
}
