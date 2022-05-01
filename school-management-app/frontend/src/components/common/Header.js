import { PageHeader } from 'antd';
import '../../app.css';

const Header = () => (
  <PageHeader
    className="site-page-header"
    onBack={() => null}
    title="Title"
    subTitle="This is a subtitle"
  />
);
export default Header;