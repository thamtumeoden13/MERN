import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { css } from '@emotion/css'

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

const QuiltedImageList = ({ data = [], cols = 3, height = 325, onClick }) => {

    const handleClick = (item) => {
        if (onClick) {
            onClick(item)
        }
    }

    return (
        <ImageList
            sx={{ height }}
            variant="quilted"
            cols={cols}
            rowHeight={height / 2}
            width={'100%'}
        >
            {data.map((item) => (
                <ImageListItem
                    key={item.img} cols={item.cols || 1} rows={item.rows || 1}
                    onClick={() => handleClick(item)}
                    className={css`
                        cursor: pointer;
                    `}
                >
                    <img
                        {...srcset(item.img, height / 2, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        subtitle={<span>{item.subtitle}</span>}
                        position="bottom"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

export default QuiltedImageList
