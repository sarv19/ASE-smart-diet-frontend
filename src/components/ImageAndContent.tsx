import { useState } from 'react';
import Modal from 'react-modal';
import classnames from 'classnames'
import Recipes from './Recipes';

type ImageAndContentProps = {
  image?: string;
  content?: any;
  reverse?: boolean;
  title?: string;
}
const ImageAndContent = (props: ImageAndContentProps) => {
  const { image, content, reverse, title} = props;

  const [isModalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const customStyles = {
    content: {
      height: '80vh',
      width: '80vw',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-30%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '1440px',
      border: 'none',
      padding: '0',
      overFlow: 'auto',
      backgroundImage: 'linear-gradient( 68.4deg,  rgba(248,182,204,1) 0.5%, rgba(192,198,230,1) 49%, rgba(225,246,240,1) 99.8% )',
      boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
      borderRadius: '10px'
    },
  };

  return (
    <div className={classnames('image-and-content', {'image-and-content-reverse': reverse})}>
      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={1000}
      >
        <Recipes closeModal={closeModal}/>
      </Modal>
      <div className='image-and-content__image'>
         <img alt={content} src={image}/>
      </div>
      <div className='image-and-content__content'>
        <div>
          <div className='image-and-content__content-title'>
            {title}
          </div>
          { content && Object.keys(content).length > 0 ?
            <div>
              <div><span className='total'>Total calories: </span>{content.calories}</div>
              <ul className='nutritient-list'>
                {
                  content.nutrients &&
                    Object.entries(content.nutrients)?.map((item, index) => {
                      return <li key={index}>{`${item[0]}: ${item[1]} ${item[0] == 'Protein'? 'gr': 'mg'}`}</li>
                    })
                }
              </ul>
              <div className={'view-recipe'}>
                <button onClick={openModal} className={'view-recipe-btn'}>View recipes</button>
              </div>
            </div> : <div className='no-data'>No data yet</div>
          }
        </div>
      </div>
    </div>
  );
};

export default ImageAndContent;