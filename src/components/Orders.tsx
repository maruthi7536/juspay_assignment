import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Typography,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import { styled, useTheme } from '@mui/material/styles';
import TableToolbar from './TableToolBar';

// Styled component for status with dot indicator
const StatusWithDot = styled(Box)<{ color: string }>(({ color }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: color,
}));

const StatusDot = styled('span')<{ color: string }>(({ color }) => ({
  display: 'inline-block',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: color,
}));

// Sample data
const rows = [
  {
    id: 1,
    orderId: '#CM9801',
    user: { name: 'Natali Craig', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    project: 'Landing Page',
    address: 'Meadow Lane Oakland',
    date: 'Just now',
    status: { label: 'In Progress', color: '#6C63FF' },
  },
  {
    id: 2,
    orderId: '#CM9802',
    user: { name: 'Kate Morrison', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    project: 'CRM Admin pages',
    address: 'Larry San Francisco',
    date: 'A minute ago',
    status: { label: 'Complete', color: 'green' },
  },
  {
    id: 3,
    orderId: '#CM9803',
    user: { name: 'Drew Cano', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    project: 'Client Project',
    address: 'Bagwell Avenue Ocala',
    date: '1 hour ago',
    status: { label: 'Pending', color: 'orange' },
  },
  {
    id: 4,
    orderId: '#CM9804',
    user: { name: 'Orlando Diggs', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    project: 'Admin Dashboard',
    address: 'Washburn Baton Rouge',
    date: 'Yesterday',
    status: { label: 'Approved', color: 'red' },
  },
  {
    id: 5,
    orderId: '#CM9805',
    user: { name: 'Andi Lane', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
    project: 'App Landing Page',
    address: 'Nest Lane Olivette',
    date: 'Feb 2, 2023',
    status: { label: 'Rejected', color: 'grey' },
  },
];

// Columns definition for the DataGrid
const columns: GridColDef[] = [
  {
    field: 'orderId',
    headerName: 'Order ID',
    width: 120,
   
  },
  {
    field: 'user',
    headerName: 'User',
    width: 200,
   
    renderCell: (params: GridRenderCellParams) => (
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        width="100%"
        height="100%" // Ensures alignment with row height
      >
        <Avatar src={params.value.avatar} alt={params.value.name} />
        <Typography>{params.value.name}</Typography>
      </Box>
    ),
  },
  {
    field: 'project',
    headerName: 'Project',
    width: 200,
   
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 200,
   
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,

    renderCell: (params: GridRenderCellParams) => (
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        width="100%"
        height="100%" // Ensures alignment with row height
      >
        <CalendarTodayIcon fontSize="small" />
        <Typography>{params.value}</Typography>
      </Box>
    ),
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Box
        display="flex"
        alignItems="center"
        width="100%"
        height="100%" // Ensures alignment with row height
      >
        <StatusWithDot color={params.value.color}>
          <StatusDot color={params.value.color} />
          <Typography>{params.value.label}</Typography>
        </StatusWithDot>
      </Box>
    ),
  },
];

const OrderListWithCustomPagination: React.FC = () => {
  const theme = useTheme();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1, // Page numbers start from 1
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaginationModel((prev) => ({ ...prev, page: value }));
  };

  return (
    <Box
      sx={{
        backgroundColor:theme.palette.mode ==="light"?  "#ffffff":'#000000' ,
        padding: 4,
        ml: `240px`,  // Adjust for left sidebar
        mr: `320px`,  // Adjust for right sidebar
        mt: `64px`,   // Adjust for top bar
        height:'100vh'
      }}
    >

      <Box p={4}>
        <Typography color ={theme.palette.mode ==="light"?  "#000000":'#ffffff'} variant="h6" fontWeight="bold" mb={2}>
          Order List
        </Typography>
        <TableToolbar />

        <Box style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows.slice(
              (paginationModel.page - 1) * paginationModel.pageSize,
              paginationModel.page * paginationModel.pageSize
            )}
            columns={columns}
            pagination
            rowCount={rows.length}
            checkboxSelection
            hideFooter
          />
        </Box>

        {/* Custom Pagination */}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Pagination
            count={5} // Always showing 5 pages as requested
            page={paginationModel.page}
            onChange={handlePageChange}
            siblingCount={0} // Number of adjacent pages to display
            boundaryCount={2} // Number of boundary pages to display
            shape="rounded"
            sx={{
              '& .Mui-selected': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)', // Light grey for selected item
                color: 'black', // Black text for selected item
              },
              '& .MuiPaginationItem-root': {
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.08)',
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OrderListWithCustomPagination;
