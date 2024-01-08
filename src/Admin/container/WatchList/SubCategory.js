import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SubCategoryForm from './SubCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState, useEffect } from 'react';
import { addWatchSubCat, deleteWatchSubCat, getWatchSubCat, updateWatchSubCat } from '../../../redux/slice/watchsub.slice';


function SubCategory() {
    const [update, setUpdate] = useState(false)

    const dispatch = useDispatch()
    const watchsubcat = useSelector(state => state.watchsubcat)
    console.log(watchsubcat);

    const watchcat = useSelector(state => state.watchcat)
    console.log(watchcat.watchcat);

    useEffect(() => {
        dispatch(getWatchSubCat())
    }, [])

    const handleSubmitForm = (data) => {
        console.log(data);

        if (update) {
            dispatch(updateWatchSubCat(data))
        } else {
            dispatch(addWatchSubCat(data))
        }
        setUpdate(false)
    }

    const handleDelet = (id) => {
        dispatch(deleteWatchSubCat(id))
    }

    const handleEdit = (data) => {
        setUpdate(data)

    }

    const columns = [
        {
            field: 'category_name',
            headerName: 'Category Name',
            width: 150,
            renderCell: (params) => {
                console.log(params);
                const fData = watchcat.watchcat.filter((v) => v.id === params.row.category_name);
                console.log(fData);

                return fData.length > 0 ? fData[0].category_name : null;
            }
        },
        { field: 'sub_name', headerName: 'SubCategory Name', width: 150 },
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
            <h2>Sub Category</h2>
            <SubCategoryForm onHandleSubmit={handleSubmitForm} updateData={update} />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={watchsubcat.watchsubcat}
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

export default SubCategory;