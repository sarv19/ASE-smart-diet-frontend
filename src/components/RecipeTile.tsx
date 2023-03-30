import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";

const RecipeTile = ({ recipe }: any) => {
  const { t, i18n } = useTranslation('', { useSuspense: false });

  const changeRecipeUrl = (url: string) => {
    if (i18n?.language?.includes('en')) {
      return url;
    } else {
      const urlArr = url.split(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im);
      const newUrl = "https://www-" + urlArr[1] + urlArr[2];
      if (newUrl.includes(".com")) return newUrl.replace(".com", "-com.translate.goog").concat("?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp")
      if (newUrl.includes(".co")) return newUrl.replace(".co", "-co.translate.goog").concat("?_x_tr_sl=auto&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp")
    }
  }
  
  return (
    <div className="recipe-tile">
      <div>
        <a
          href={changeRecipeUrl(recipe.recipe_url)}
          target="_blank"
          className="recipe-tile-img"
          rel="noreferrer"
        >
          <img alt={recipe.name} src={recipe.image_url} />
        </a>
        <a
          href={changeRecipeUrl(recipe.recipe_url)}
          target="_blank"
          className="recipe-tile-link"
          rel="noreferrer"
        >
          <div className="recipe-tile-title">{t(recipe.name)}</div>
        </a>
        <div className="recipe-tile-nutrition">
          <div className="recipe-tile-nutrition-calories">
            {recipe.calories} {t("calories")}
          </div>
          <div className="recipe-tile-nutrition-allergens">
            {recipe.allergens?.map((item: string) => (
              <Tooltip
                key={item}
                title={item}
                className="recipe-tile-nutrition-allergens-item"
              >
                *{t(item)}
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
      <div>
        <hr className="recipe-tile-hr" />
        <div className="recipe-tile-info">
          <div>
            <div className="recipe-tile-info-label">{t("Time")}</div>
            <div className="recipe-tile-info-value">
              {recipe.cooking_time} {t("mins")}
            </div>
          </div>
          <div className="recipe-tile-info-right">
            <div className="recipe-tile-info-label">{t("Portion")}</div>
            <div className="recipe-tile-info-value">
              {recipe.portion} {t("persons")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeTile;
