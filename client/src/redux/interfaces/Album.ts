export interface Album{
  _id?: string,
  title: string,
  singer: string,
  description: string,
  composer: string,
  tags: string[],
  selectedFile: string | any,
  likes: string[],
  createdAt: Date | null,
  creator: string
  // song: 
}
