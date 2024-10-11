'use client';

interface buttonParams {
  text: string;
  icon?: JSX.Element;
  color?: number;
  onClick?: () => void;
}

function Button({ text, icon, color, onClick }: buttonParams) {
  return (
    <button
      className={`p-[1px] ${color === 1 ? 'bg-Blue-gradient' : color === 2 ? 'bg-Orange-gradient' : 'bg-Red-gradient'} rounded-full flex items-center justify-center gap-2`}
      onClick={onClick}
    >
      <div className="dark:bg-[#1f1f1f] bg-[#F9F9F9] flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-clip-border">
        {icon}
        <span
          className={`${color === 1 ? 'bg-Blue-gradient' : color === 2 ? 'bg-Orange-gradient' : 'bg-Red-gradient'} text-transparent bg-clip-text text-lg`}
        >
          {text}
        </span>
      </div>
    </button>
  );
}

export default Button;
