import Link from 'next/link';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface BreadcrumbItem {
  folderId: string;
  folderName: string;
}

const Breadcrumb = ({
  items,
  maxDisplay = 3,
}: {
  items: BreadcrumbItem[];
  maxDisplay?: number;
}) => {
  const shouldTruncate = items.length > maxDisplay;
  const displayedItems = shouldTruncate
    ? [items[0], { folderId: '', folderName: '...' }, ...items.slice(-maxDisplay + 1)]
    : items;

  return (
    <div className="flex items-center gap-x-2">
      {displayedItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.folderId ? (
            <Link href={`/storage/${item.folderId}`}>
              <h2 className="text-3xl font-normal">{item.folderName}</h2>
            </Link>
          ) : (
            <h2 className="text-3xl font-normal">{item.folderName}</h2>
          )}
          {index < displayedItems.length - 1 && <span className="mx-2">›</span>}
        </React.Fragment>
      ))}
      <button>
        <FaChevronDown />
      </button>
    </div>
  );
};

export default Breadcrumb;
