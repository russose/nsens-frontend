import Link from "next/link";

const Header: React.FunctionComponent = (props) => {
  return (
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/AtomsPage">
        <a>About</a>
      </Link>
    </div>
  );
};

export default Header;
