
import PointDetails from "../../components/director/PointDetails";
import DirectorHeader from "../../components/header/DirectorHeader";

interface PointDetailsPageProps {
    transaction: string,
    consolidation: string
  }
  
  const PointDetailsPage: React.FC<PointDetailsPageProps> = ({ consolidation, transaction}) => {
    return (
      <div>
        <DirectorHeader/>
        <PointDetails consolidation={consolidation}  transaction={transaction}/>
      </div>
    )
  }
  
  export default PointDetailsPage