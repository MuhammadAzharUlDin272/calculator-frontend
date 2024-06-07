import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const rowHeight = 40;

export default function MyTableContainer(props) {
  const { columns, data, customPageSize, minHeight } = props;

  const getRowId = (row) => {
    return row.id; // Adjust according to the identifier in your data
  };

  return (
    <Box sx={{ width: '100%', overflowY: 'hidden', borderRadius: '6px', position: 'relative', background:"white"}}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowHeight={() => rowHeight}
        disableRowSelectionOnClick={true}
        columnHeaderHeight={30}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: customPageSize } } }}
        pageSizeOptions={[25, 50, 100 ]}
        getRowId={getRowId}
        style={{ minHeight,width:"100%" }}
        // sx={{
        //   '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeader': {
        //     backgroundColor: '#FFA500', // Use this for a more specific targeting of header elements
        //     color: '#ffffff',
        //     width:"100vw",
        //   }
        // }}
      />
    </Box>
  );
}
