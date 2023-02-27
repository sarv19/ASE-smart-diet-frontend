import { Progress } from "antd";
import Head from "next/head";
import { ImageAndContent, Header } from "../components";

const mockData = {
  'breakfast': {
    'calories': 300,
    'nutrients': {
      'Protein': 100,
      'Fat': 10,
      'Carbohydrate': 15,
      'Vintamin': 5
    }
  },
  'lunch': {},
  'dinner': {}
}

const Summary = () => {

  return (
    <div className="summary">
      <Head>
        <title>Today's summary</title>
      </Head>
      <Header text={`Today's summary`}/>
      <div className="progress-bar">
        <Progress percent={15} strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }} />
        <div className="progress-bar-sumup">300 / 2000 calories</div>
      </div>
      <ImageAndContent image={'static/images/breakfast.png'} title={'Breakfast'} content={mockData.breakfast}/>
      <ImageAndContent image={'static/images/cooking.png'} title={'Lunch'} content={mockData.lunch} reverse/>
      <ImageAndContent image={'static/images/snack.png'} title={'Dinner'} content={mockData.dinner}/>
    </div>

  )
};

export default Summary;