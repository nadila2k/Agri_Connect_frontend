import Slider from "../../components/Slider"
import AboutUsComponent from '../../components/About/Sector';
import FarmerChart from "../../components/Charts/FarmerChart";
import AdminChart from "../../components/Charts/AdminChart";
const Home = () => {
  return (
    <>
      <Slider />
      <FarmerChart />
      <AdminChart />
      <AboutUsComponent />
    </>
  )
}

export default Home