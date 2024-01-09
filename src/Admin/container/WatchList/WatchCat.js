import React, { useState } from 'react';
import WatchCatForm from './WatchCatForm';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addWatchCat, deleteWatchCat, getWatchCat, updateWatchCat } from '../../../redux/slice/watchcat.slice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

function WatchCat(props) {
    const [update, setUpdate] = useState(false)

    const dispatch = useDispatch()

    const watchcat = useSelector(state => state.watchcat)
    console.log(watchcat);

    useEffect(() => {
        dispatch(getWatchCat())
    }, [])

    const handleSubmitForm = (data) => {

        console.log(data);
        if (update) {
            dispatch(updateWatchCat(data))
        } else {
            dispatch(addWatchCat(data))
        }
        setUpdate(false)
    }

    const handleDelet = (id) => {
        dispatch(deleteWatchCat(id))
    }

    const handleEdit = (data) => {
        setUpdate(data)
    }

    const columns = [
        { field: 'category_name', headerName: 'Category Name', width: 200 },
        {
            field: "action",
            headerName: "Action",
            width: 130,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>

                        <IconButton aria-label="delete" onClick={() => handleDelet(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                )
            }
        }

    ];



    return (
        <div>
            <h2>Category:</h2>
            <WatchCatForm onHandleSubmit={handleSubmitForm} updateData={update} />
            <br></br><br></br>
            <div sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={watchcat.watchcat}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                page: 0, pageSize: 5,
                            },
                        },
                    }}

                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>

        </div>
    );
}

export default WatchCat;