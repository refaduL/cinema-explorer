import { RiMovie2Fill } from 'react-icons/ri';

const CinemaExplorerLogo = () => {
  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-full transition-all duration-200 hover:shadow-logoglow hover:scale-102 hover:bg-transparent">
      {/* Icon */}
      <RiMovie2Fill className="text-primary" size={36} />
      {/* Text */}
      <div className="text-2xl">
        <span className="text-primary font-bold">Cinema</span>
        <span className="text-primary font-semibold">Explorer</span>
      </div>
    </div>
  );
};

export default CinemaExplorerLogo;
