import React, {ReactNode} from 'react';

export interface IListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

export function List<T>({ items, renderItem }: IListProps<T>) {
  return (
      <>
        {items.map(renderItem)}
      </>
  );
};
