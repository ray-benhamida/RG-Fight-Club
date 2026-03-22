export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}
