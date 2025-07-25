import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
};

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        [
          'flex',
          'h-10',
          'items-center',
          'text-center',
          'rounded-lg',
          'px-4',
          'text-sm',
          'font-medium',
          'text-white',
          'transition-colors',
          'hover:bg-zinc-500',
          'focus-visible:outline',
          'focus-visible:outline-2',
          'focus-visible:outline-offset-2',
          'focus-visible:outline-zinc-500',
          'active:bg-zinc-600',
          'aria-disabled:cursor-not-allowed',
          'aria-disabled:opacity-50',
        ],
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;