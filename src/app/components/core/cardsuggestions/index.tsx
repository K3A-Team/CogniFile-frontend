import React from 'react';

function CardSuggestions() {
  return (
    <div className="rounded-[8px] bg-dar-card p-5 gap-8 flex flex-col items-center z-[30]">
      <h3 className="text-sm text-[#52C41A]">Suggested impovements</h3>
      <div className="flex flex-col gap-2 text-lg">
        {[
          'Spelling mistakes',
          'Grammar mistakes',
          'Style and Clarity Enhancements',
          'Punctuation and Formatting',
          'Redundancy Improvements',
          'Content Suggestions',
          'Consistency Checks',
        ].map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            <div className="rounded-full bg-white opacity-45 h-1 w-1"></div>
            <p key={index} className="text-white opacity-45">
              {item}
            </p>
          </div>
        ))}
      </div>
      <div className="gap-4 flex items-center">
        <p className="text-white opacity-60">Discard</p>
        <div className="text-[#191919] px-4 py-2 rounded-full bg-white text-sm">
          Apply improvement
        </div>
      </div>
    </div>
  );
}

export default CardSuggestions;
