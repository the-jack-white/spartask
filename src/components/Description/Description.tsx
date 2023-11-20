import { shortString } from "../../utils";
import "./Description.css";

type DescriptionProps = {
  selected: boolean;
  title?: string;
  description?: string;
  shortLength: number;
};

const Description = ({
  selected,
  title,
  description,
  shortLength,
}: DescriptionProps) => {
  const shortDescription = description && shortString(description, shortLength);

  return (
    <div
      className={`${selected ? "desc-container-selected" : "desc-container"}`}
      data-testid="desc-container"
    >
      <h5 data-testid="desc-title">{title}</h5>
      {!selected && (
        <span data-testid="desc-description">{shortDescription}</span>
      )}
    </div>
  );
};

export default Description;
