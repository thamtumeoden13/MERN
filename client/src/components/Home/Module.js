import React from 'react'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'

import imageLogo_Green from '../../assets/MV5BMTEwNWE3MWEtNTMxMS00YmMyLWExZDQtZGFmNWZkODkwNGZlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_SX750_AL_.jpg'

import { useHover } from '../../utils'

const useStyles = makeStyles(theme => ({
    card: {
        position: 'relative',
        height: 512,
        display: 'flex',
        flexDirection: 'column',
        transition: `all 0.2s ease-in-out`,
        backgroundColor: (theme.palette.type === 'dark') ? '#333' : '#fff',
    },
    cardMedia: {
        height: '512px',
        transition: `all 0.5s ease-in-out`,
        '&:hover': {
            transform: `scale(1.1)`,
        }
    },
    cardContent: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        zIndex: theme.zIndex.drawer - 1,
        backgroundColor: 'rgba(20,20,20,0.75)',
        color: '#ccc',
        fontSize: 14,
        fontFamily: 'Verdana, Arial, sans-serif',
        maxHeight: '30%',
        padding: '15px 10%',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        transition: `all 0.5s ease-in-out`,
    },
    cardDivider: {
        display: 'block',
        height: '1px',
        border: 0,
        borderTop: '1px solid #666',
    },
    cardLink: {
        textDecoration: 'none',
        color: alpha(theme.palette.common.white, 0.55),
        '&:hover': {
            color: alpha(theme.palette.common.white, 0.75),
        }
    },
    ratingCount: {
        color: alpha(theme.palette.common.white, 0.55),
    }
}))

/**
 * Module
 * @type {{docResource: String, docTitle: String, docYear: String, imgTitle: String, ratingCount: String, ratingValue: String}}
 */
Module.propTypes = {
    docResource: PropTypes.string.isRequired,
    docTitle: PropTypes.string.isRequired,
    docYear: PropTypes.string.isRequired,
    imgTitle: PropTypes.string.isRequired,
    ratingCount: PropTypes.string.isRequired,
    ratingValue: PropTypes.string.isRequired
}

function Module({ ratingValue, ratingCount, docTitle, docResource, imgTitle, docYear }) {
    const classes = useStyles()
    const [hover, setHover] = useHover()
    const imgLink = `${process.env.PUBLIC_URL}/cover/${imgTitle}`

    return (
        <Card className={classes.card} {...setHover}>
            <LazyLoad height={200} offset={[100, 0]} overflow={true}>
                <CardMedia className={classes.cardMedia} image={imageLogo_Green} />
            </LazyLoad>
            <div className={classes.cardContent} style={{ opacity: hover ? 100 : 0 }}>
                <Typography>{ratingValue}/10</Typography>
                <small className={classes.ratingCount}>{ratingCount}</small>

                <hr className={classes.cardDivider} />
                <a target="_blank" rel="noopener noreferrer" href={docResource} className={classes.cardLink}>
                    <p>{`${docTitle} (${docYear})`}</p>
                </a>
            </div>
        </Card>
    )
}

export default Module