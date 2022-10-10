import type { InOperatorItem } from '../types';

interface InOperatorComponentProps {
  items: InOperatorItem[];
}

export default function InOperatorComponent({
  items,
}: InOperatorComponentProps) {
  return (
    <ul>
      {items.map((item) => {
        if ('title' in item) {
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
