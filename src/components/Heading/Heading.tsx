import "./Heading.css";

type HeadingProps = {
  title: string;
  date?: string;
};

const Heading = ({ title, date }: HeadingProps) => {
  return (
    <div className="heading-container bottom-border">
      <h2>{title}</h2>
      <span className="heading-date">{date}</span>
    </div>
  );
};

export default Heading;
