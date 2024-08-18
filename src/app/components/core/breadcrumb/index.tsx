import Link from 'next/link';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const Breadcrumb = ({ items, maxDisplay = 3 }: { items: string[]; maxDisplay?: number }) => {
  const shouldTruncate = items.length > maxDisplay;
  const displayedItems = shouldTruncate
    ? [items[0], '...', ...items.slice(-maxDisplay + 1)]
    : items;

  return (
    <div className="flex items-center gap-x-2">
      {displayedItems.map((item, index) => (
        <React.Fragment key={index}>
          <Link href="@">
            <h2 className="text-3xl font-normal">{item}</h2>
          </Link>
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
