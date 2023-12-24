import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SubCategoryForm from './SubCategoryForm';

import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';


function SubCategory() {
    const [update, setUpdate] = useState(false)

    const dispatch = useDispatch()



    const handleSubmitForm = () => {

    }

    const handleEdit = () => {

    }

    const handleDelet = () => {

    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
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

    const rows = [
        { id: 1, name: 'Snow', age: 35 },
    ];

    return (
        <div>
            <h2>Sub Category</h2>
            <SubCategoryForm onHandleSubmit={handleSubmitForm} updateData={update} />
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
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