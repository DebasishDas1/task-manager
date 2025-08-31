type MyHeaderProps = {
  title?: string;
};

const MyHeader = ({ title }: MyHeaderProps) => {
  return <div className="text-7xl font-black py-16">{title}</div>;
};

export default MyHeader;
