import React, { useMemo } from 'react';

export function Grid<T>(props: {
  id: string;
  data: T[];
  loading?: boolean;
  renderItem: (value: T) => React.ReactNode;
  renderSkeleton?: (id: number) => React.ReactNode;
  skeletonLength?: number;
  marginBottom?: number;
  onMore?: () => void;
  xs?: number;
  md?: number;
  lg?: number;
}) {
  const { skeletonLength, data, renderItem, loading, renderSkeleton } =
    props;

  // Fake tab to iterate skeleton when loading
  const tab = useMemo(() => {
    const size = skeletonLength ?? 10;
    return Array(size).fill('');
  }, [skeletonLength]);

  return (
      <React.Fragment>
        {data.map((item) => (
          renderItem(item)
        ))}
        {loading === true && renderSkeleton
          ? tab.map((_, i) => (
            renderSkeleton(i)
          ))
        : null}
      </React.Fragment>
  );
}

export default Grid;
