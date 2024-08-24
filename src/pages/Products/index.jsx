import classes from './Products.module.css'

const Products = () => {
  return (
    <section className={classes.products}>
      <div className={classes['product-card']}>
        <div className={classes['product-info']}>
          <h3>Organic Vegetables</h3>
          <p>
            Discover the freshest, nutrient-rich vegetables grown naturally
            without chemicals.
          </p>
        </div>
      </div>
      <div className={classes['product-card']}>
        <div className={classes['product-info']}>
          <h3>Organic Fruits</h3>
          <p>
            Enjoy a variety of succulent, organic fruits picked at their peak
            for maximum flavor.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Products