export const ModalTrigger = ({
  onClick,
  isInLibrary,
}: {
  onClick: () => void;
  isInLibrary: boolean;
}) => (
  <button
    onClick={onClick}
    className="w-full mt-6 relative h-14 bg-white text-black hover:bg-calypso-DEFAULT rounded-none border-2 border-transparent hover:border-white transition-all overflow-hidden group"
  >
    <span className="font-bold text-lg relative z-10 uppercase tracking-widest">
      {isInLibrary ? "Editar Estado" : "Añadir a Colección"}
    </span>
    <div className="absolute inset-0 h-full w-0 bg-calypso-DEFAULT transform skew-x-[-20deg] -ml-4 transition-all duration-300 group-hover:w-[120%]" />
  </button>
);
