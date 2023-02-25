import { CloseIcon } from './Icons';
import RecipeTile from './RecipeTile';

type RecipesProps = {
    closeModal: any;
}

const mockRecipes = [
    {
        img: 'https://images.immediate.co.uk/production/volatile/sites/30/2014/05/Epic-summer-salad-hub-2646e6e.jpg',
        title: 'Fresh and healthy salad',
        calories: 100,
        cookingTime: 5,
        portion: 3,
        recipeLink: 'https://www.foodnetwork.com/recipes/rachael-ray/your-basic-tossed-salad-recipe-1939300',
        allergens: [
            {
                label: 'Has Potassium',
                symbol: 'K'
            },
            {
                label: 'Has Soy',
                symbol: 'S'
            }
        ]
    },
    {
        img: 'https://www.marionskitchen.com/wp-content/uploads/2022/09/Slow-cooker-Thai-Beef-Noodle-Soup-01.jpg',
        title: 'Spicy Beef Noodles',
        calories: 350,
        cookingTime: 18,
        portion: 2,
        recipeLink: 'https://www.allrecipes.com/recipe/17794/beef-noodle-soup/',
        allergens: []
    },
    {
        img: 'https://mccormick.widen.net/content/n0phdkxdlp/jpeg/Franks_RedHot_Buffalo_Chicken_Wings.jpg?crop=true&anchor=0,0&q=80&color=ffffffff&u=qtpeo3&w=800&h=800',
        title: 'Chicken BBQ Wings',
        calories: 400,
        cookingTime: 30,
        portion: 3,
        recipeLink: 'https://www.foodnetwork.com/recipes/ree-drummond/classic-hot-wings-recipe-2107280',
        allergens: [
            {
                label: 'Has Potassium',
                symbol: 'K'
            }
        ]
    },
]

const Recipes = ({ closeModal } : RecipesProps) => {

    return (
        <div className='recipes'>
            <div className='recipes-content'>
                <div className='recipes-close'>
                    <button onClick={closeModal} className='recipes-close-btn'>
                        <CloseIcon />
                    </button>
                </div>
                <div className='recipes-title'>Simple and tasty recipes</div>
                <div className='recipes-sub-title'>Using your list of chosen ingredients</div>
                <div className='recipes-list'>
                    { mockRecipes.map((recipe: any, index: any) => 
                        <RecipeTile key={index} recipe={recipe}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Recipes;