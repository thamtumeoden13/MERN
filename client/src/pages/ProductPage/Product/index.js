import React from 'react'

import ProductComponent from '../../../components/Products/Product'

const Product = ({ product, handleCurrentId }) => {

    return (
        <ProductComponent product={product} handleCurrentId={handleCurrentId} />
    )
}

export default Product