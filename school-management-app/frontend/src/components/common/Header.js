import { PageHeader } from 'antd';
import '../../app.scss';

const Header = () => (
  <PageHeader
    className="site-page-header"
    onBack={() => null}
    title="Title"
    subTitle="This is a subtitle"
  />
);
export default Header;