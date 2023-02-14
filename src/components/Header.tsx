type HeaderProp = {
  text: string;
}

const Header = ({ text }: HeaderProp) => {
  return (
    <div className={'top-header'}>
      { text }
    </div>
  )
}

export default Header;