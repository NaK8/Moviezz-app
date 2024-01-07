interface ButtonProps {
  isOpen: boolean;
  getIsOpen: (open: boolean) => void;
}

const Button = ({ isOpen, getIsOpen }: ButtonProps) => {
  return (
    <button className="btn-toggle" onClick={() => getIsOpen(!isOpen)}>
      {isOpen ? "–" : "+"}
    </button>
  );
};

export default Button;
