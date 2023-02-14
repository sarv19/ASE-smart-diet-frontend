import { CommingSoon } from "../pageComponent";
import { CloseIcon } from "./Icons";

type RecipesProps = {
    closeModal: any;
}

const Recipes = ({ closeModal } : RecipesProps) => {
    return (
        <div className="recipes">
            <div className="bg-img"></div>
            <div className="recipes-content">
                <div className="recipes-close">
                    <button onClick={closeModal} className='recipes-close-btn'>
                        <CloseIcon />
                    </button>
                </div>
                <div className="recipes-title">Simple and tasty recipes</div>
                <div className="recipes-sub-title">Using your list of chosen ingredients</div>
                <div className="recipes-commingsoon">
                    <CommingSoon />
                </div>
            </div>
        </div>
    )
}

export default Recipes;