import CommonHeader from '../../components/header/CommonHeader'
import UserSideFooter from '../../components/footer/UserSideFooter'
import CostEstimation from '../../components/common/costEstimation';

function CostEstimationPage() {
  return (
    <div>
        <CommonHeader/>
        <CostEstimation />
        <UserSideFooter/>
    </div>
  )
}

export default CostEstimationPage;