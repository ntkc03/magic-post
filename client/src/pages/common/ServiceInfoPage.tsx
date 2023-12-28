import CommonHeader from '../../components/header/CommonHeader'
import UserSideFooter from '../../components/footer/UserSideFooter'
import ServiceInfo from '../../components/common/serviceInfo';

function ServiceInfoPage() {
  return (
    <div>
        <CommonHeader/>
        <ServiceInfo/>
        <UserSideFooter/>
    </div>
  )
}

export default ServiceInfoPage;