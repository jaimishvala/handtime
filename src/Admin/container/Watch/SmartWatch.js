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
    const [mdata, setMdata] = useState([])
    const [update, setUpdate] = useState(false)

    const watch = useSelector(state => state.watch)
    console.log(watch);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getWatch())
    }, [])

    const handleFormSubmit = (data) => {
        console.log(data);
        let localData = JSON.parse(localStorage.getItem("watch"));


        let id = Math.floor(Math.random() * 1000);

        if (localData) {
            if (update) {
                dispatch(updateWatch(data))
            } else {
                dispatch(addWatch(data))
            }

        } else {
            localStorage.setItem("watch", JSON.stringify([{ id, ...data }]))
            setMdata(localData)
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
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'desc', headerName: 'Description', width: 130 },
        { field: 'designation', headerName: 'Designation', width: 130 },
        { field: 'profile_url', headerName: 'Profile URL', width: 130 },
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
            }
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
