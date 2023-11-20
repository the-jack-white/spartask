import "./Radio.css";

type RadioProps = {
  callback: () => void;
  selected: boolean;
};

const Radio = ({ callback, selected }: RadioProps) => {
  return (
    <button
      className={`bi ${
        selected ? "bi-check-circle" : "bi-circle"
      } radio-container `}
      onClick={callback}
      data-testid="radio-button"
    />
  );
};

export default Radio;
