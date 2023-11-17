import "./AppContainer.css";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return <main className="app-container">{children}</main>;
};

export default AppContainer;
