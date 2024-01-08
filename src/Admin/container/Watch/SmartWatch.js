import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import WatchForm from './WatchForm';
import { addWatch, deleteWatch, getWatch, updateWatch } from '../../../redux/slice/watch.slice';

export default function SmartWatch(props) {
    const [update, setUpdate] = useState(false)

    const watch = useSelector(state => state.watch)
    console.log(watch);

    const watchcat = useSelector(state => state.watchcat)
    console.log(watchcat.watchcat);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWatch())
    }, [])

    const handleFormSubmit = (data) => {
        console.log(data);
        if (update) {
            dispatch(updateWatch(data))
        } else {
            dispatch(addWatch(data))
        }

        setUpdate(false)
    }

    const handleDelet = (id) => {
        dispatch(deleteWatch(id))
    }

    const handleEdit = (data) => {
        setUpdate(data)
    }



    const columns = [
        {
            field: 'category_name',
            headerName: 'Category Name',
            width: 200,
            renderCell: (params) => {
                console.log(params.row.id, params);
                const fData = watchcat.watchcat.filter((v) => v.id === params.row.category_name);
                console.log(fData);

                return fData.length > 0 ? fData[0].category_name : null;
            }
        },
        { field: 'sub_name', headerName: 'SubCategory Name', width: 200 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'price', headerName: 'Price', width: 200 },
        { field: 'desc', headerName: 'Description', width: 200 },
        {
            field: "action",
            headerName: "Action",
            width: 130,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="delete" onClick={() => handleDelet(params.row.id)}>
                            <DeleteIcon />
                        </IconButton>

                        <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </>
                )
            },
        }

    ];

    return (
        <div>
            <WatchForm onHandleSubmit={handleFormSubmit} updateData={update} />
            <div style={{ height: 400, width: '100%' }}>

                <DataGrid
                    rows={watch.watch}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </div>
    );
}
