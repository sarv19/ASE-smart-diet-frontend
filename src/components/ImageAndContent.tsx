import { useMemo, useState } from "react";
import Modal from "react-modal";
import classnames from "classnames";
import Recipes from "./Recipes";
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter } from "./utils";

type ImageAndContentProps = {
  image?: string;
  content?: any;
  reverse?: boolean;
  title?: string;
};
const ImageAndContent = (props: ImageAndContentProps) => {
  const { image, content: mealData, reverse, title } = props;

  const { t } = useTranslation('', { useSuspense: false });

  const mealDataNutrition = useMemo(() => {
    return {
      "Weight": mealData?.meal?.totalWeight,
      "Protein (mg)": mealData?.meal?.totalProtein,
      "Fat (mg)": mealData?.meal?.totalFat,
      "Carbohydrates (mg)": mealData?.meal?.totalCarbohydrate,
      // sodium: mealData?.meal?.totalSodium,
    }
  }, [mealData]);

  const mealCalories = useMemo(() => {
    const ingredients = mealData?.ingredients;
    return ingredients?.reduce((acc: any, item: any) => {
      return acc + item.calories;
    }, 0);
  }, [mealData]);

  const [isModalOpen, setModalOpen] = useState(false);

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  const customStyles = {
    content: {
      height: "80vh",
      width: "80vw",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-30%",
      transform: "translate(-50%, -50%)",
      maxWidth: "1440px",
      border: "none",
      padding: "0",
      overFlow: "auto",
      backgroundImage:
        "linear-gradient( 68.4deg,  rgba(248,182,204,1) 0.5%, rgba(192,198,230,1) 49%, rgba(225,246,240,1) 99.8% )",
      boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      borderRadius: "10px",
    },
  };

  return (
    <div
      className={classnames("image-and-content", {
        "image-and-content-reverse": reverse,
      })}
    >
      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={1000}
      >
        <Recipes closeModal={closeModal} content={{targetCalories: mealCalories}} />
      </Modal>
      <div className="image-and-content__image">
        <img alt={mealData} src={image} />
      </div>
      <div className="image-and-content__content">
        <div>
          <div className="image-and-content__content-title">{title}</div>
          {mealData && Object.keys(mealData).length > 0 ? (
            <div>
              <div>
                <span className="total">{t("Total calories")}: </span>
                {mealCalories}
              </div>
              <ul className="nutritient-list">
                {mealDataNutrition &&
                  Object.entries(mealDataNutrition)?.map((item, index) => {
                    return (
                      <li key={index}>{capitalizeFirstLetter(t(item[0]))}: {item[1]} {
                        item[0] == "Protein" ? "gr" : "mg"
                      }</li>
                    );
                  })}
              </ul>
              <div className={"view-recipe"}>
                <button onClick={openModal} className={"view-recipe-btn"}>
                  View recipes
                </button>
              </div>
            </div>
          ) : (
            <div className="no-data">No data yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAndContent;
