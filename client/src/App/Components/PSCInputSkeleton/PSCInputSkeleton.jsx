import { Skeleton, Fade, Typography } from '@mui/material';
import { any, bool, number } from 'prop-types';
import { memo } from 'react';
const ChildrenWrapper = ({ children, loading }) => {
    return (
        <Fade in={!loading} timeout={50}>
            <div>
                {children}
            </div>
        </Fade>
    )
},
    PSCInputSkeleton = (props) => {
        const componentID = "PSCInputSkeleton",
            { children, loading, multiline } = props,
            height = 40 * multiline
        return (
            <Typography className={componentID} component="div">
                {loading ? <Skeleton className={`${componentID}__skeleton`} variant="rectangular" height={height} /> : <ChildrenWrapper loading={loading}>{children}</ChildrenWrapper>}
            </Typography>
        )
    }

PSCInputSkeleton.defaultProps = {
    multiline: 1
}
PSCInputSkeleton.propTypes = {
    children: any.isRequired,
    loading: bool.isRequired,
    multiline: number
}

export default memo(PSCInputSkeleton)