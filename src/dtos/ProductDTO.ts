export type ProductDTO = {
  id: string;
  title: string;
  description: string;
  priceInCents: number;
  status: string;
  owner: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: {
      id: string;
      url: string;
    };
  };
  category: {
    id: string;
    title: string;
    slug: string;
  };
  attachments: {
    id: string;
    url: string;
  }[];
};
