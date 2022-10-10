interface ImageItem {
  id: number;
  title: string;
  imageUrl: string;
}

interface ImageItemType extends ImageItem {
  type: 'IMAGE_ITEM';
}

interface QuoteItem {
  id: number;
  quote: string;
}

interface QuoteItemType extends QuoteItem {
  type: 'QUOTE_ITEM';
}

type InOperatorItem = ImageItem | QuoteItem;
type EqualityItem = ImageItemType | QuoteItemType;

export {
  ImageItem,
  ImageItemType,
  QuoteItem,
  QuoteItemType,
  InOperatorItem,
  EqualityItem,
};
