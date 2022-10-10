import type { EqualityItem } from '../types';

interface EqualityComponentProps {
  items: EqualityItem[];
}

export default function EqualityComponent({ items }: EqualityComponentProps) {
  return (
    <ul>
      {items.map((item) => {
        if (item.type === 'IMAGE_ITEM') {
          return (
            <li key={item.id}>
              {item.title && <p>{item.title}</p>}
              {item.imageUrl && (
                <img
                  style={{ maxWidth: '15rem' }}
                  src={item.imageUrl}
                  alt={item.title}
                />
              )}
            </li>
          );
        }
        return (
          <li key={item.id}>
            {item.quote && <p style={{ fontStyle: 'italic' }}>{item.quote}</p>}
          </li>
        );
      })}
    </ul>
  );
}
