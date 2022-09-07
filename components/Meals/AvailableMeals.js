
// give the list of available meals to screen
import classes from './AvailableMeals.module.css';
// the card we create
import Card from '../UI/Card.js';
// list od name price and description in lise meal
import MealItem from './MealItem/MealItem';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  // {mealseList} -> we want to reveive the card we create with all available meals list
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul> 
      </Card>
    </section>
  );
};

export default AvailableMeals;