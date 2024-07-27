import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {product.description}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Category: {product.category}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Size: {product.size}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Color: {product.color}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Price: ${product.price}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Stock: {product.stock}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onEdit(product)}>Edit</Button>
        <Button size="small" onClick={() => onDelete(product.id)}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
