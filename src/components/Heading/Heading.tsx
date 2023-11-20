import "./Heading.css";

type HeadingProps = {
  title: string;
  date?: string;
};

const Heading = ({ title, date }: HeadingProps) => {
  return (
    <div
      className="heading-container bottom-border"
      data-testid="heading-container"
    >
      <h2 data-testid="heading-title">{title}</h2>
      <span className="heading-date" data-testid="heading-date">
        {date}
      </span>
    </div>
  );
};

export default Heading;
