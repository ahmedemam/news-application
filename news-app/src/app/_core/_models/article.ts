import { Source } from './source';

export interface Article {
  source: Source;
  auther: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
