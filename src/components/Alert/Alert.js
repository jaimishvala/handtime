import { useSnackbar } from 'notistack';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetAlert } from '../../redux/slice/alert.slice';

function Alert(props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const dispatch = useDispatch()

    const alert = useSelector(state => state.alert)
    console.log(alert);

    useEffect(() => {
        if (alert.text !== '') {
            enqueueSnackbar(alert.text, {
                variant: alert.color,
                anchorOrigin: {
                    vertical: "top",
                    horizontal: "right"
                }
            })
        }

        let resetRef = setTimeout(() => {
            dispatch(resetAlert());
        }, 2000)

        return () => {
            clearTimeout(resetRef);
        }
    }, [alert.text])

    return (
        <div>

        </div>
    );
}

export default Alert;