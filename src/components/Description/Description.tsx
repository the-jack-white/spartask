import { shortString } from "../../utils/utils";
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
    >
      <h5>{title}</h5>
      {!selected && <span>{shortDescription}</span>}
    </div>
  );
};

export default Description;
