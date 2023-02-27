import { Tooltip } from 'antd';

const RecipeTile = ({recipe}: any) => {
    return (
        <div className='recipe-tile'>
            <div>
                <a href={recipe.recipeLink} target='_blank' className='recipe-tile-img' rel='noreferrer'>
                    <img
                        alt={recipe.title}
                        src={recipe.img}
                    />
                </a>
                <a href={recipe.recipeLink} target='_blank' className='recipe-tile-link' rel='noreferrer'>
                    <div className='recipe-tile-title'>{recipe.title}</div>
                </a>
                <div className='recipe-tile-nutrition'>
                    <div className='recipe-tile-nutrition-calories'>{recipe.calories} calories</div>
                    <div className='recipe-tile-nutrition-allergens'>
                        {recipe.allergens?.map((item: any, i: number) => 
                            <Tooltip key={i} title={item.label} className='recipe-tile-nutrition-allergens-item'>*{item.symbol}</Tooltip>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <hr className='recipe-tile-hr'/>
                <div className='recipe-tile-info'>
                    <div>
                        <div className='recipe-tile-info-label'>Time</div>
                        <div className='recipe-tile-info-value'>{recipe.cookingTime} mins</div>
                    </div>
                    <div className='recipe-tile-info-right'>
                        <div className='recipe-tile-info-label'>Portion</div>
                        <div className='recipe-tile-info-value'>{recipe.portion} persons</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipeTile;