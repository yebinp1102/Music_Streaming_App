export interface Album{
  _id?: string,
  title: string,
  singer: string,
  description: string,
  composer: string,
  tags: string[],
  selectedFile: Object | any,
  likeCount: number,
  createdAt: Date | null,
  // song: 
}
