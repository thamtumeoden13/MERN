import React from 'react'

import ProductsCom from '../../components/Products'
import { useTitle } from '../../utils';

const Products = ({ handleCurrentId }) => {

    useTitle('Art-Sunday | Danh Sách Sản Phẩm');

    return (
        <ProductsCom handleCurrentId={handleCurrentId} />
    )
}

export default Products