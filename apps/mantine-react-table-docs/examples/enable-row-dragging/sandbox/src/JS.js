import React, { useMemo, useState } from 'react';
import MantineReactTable from 'mantine-react-table';
import { Box, Typography } from '@mui/material';
import { data } from './makeData';

const Example = () => {
  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
    ],
    [],
    //end
  );

  const [data1, setData1] = useState(() => data.slice(0, 3));
  const [data2, setData2] = useState(() => data.slice(3, 5));

  const [draggingRow, setDraggingRow] = useState(null);
  const [hoveredTable, setHoveredTable] = useState(null);

  const commonTableProps = {
    columns,
    enableRowDragging: true,
    enableFullScreenToggle: false,
    mantineTableContainerProps: {
      sx: {
        minHeight: '320px',
      },
    },
    onDraggingRowChange: setDraggingRow,
    state: { draggingRow },
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'auto', lg: '1fr 1fr' },
        gap: '1rem',
        overflow: 'auto',
        padding: '4px',
      }}
    >
      <MantineReactTable
        {...commonTableProps}
        data={data1}
        defaultColumn={{
          size: 100,
        }}
        getRowId={(originalRow) => `table-1-${originalRow.firstName}`}
        mantineRowDragHandleProps={{
          onDragEnd: () => {
            if (hoveredTable === 'table-2') {
              setData2((data2) => [...data2, draggingRow.original]);
              setData1((data1) =>
                data1.filter((d) => d !== draggingRow.original),
              );
            }
            setHoveredTable(null);
          },
        }}
        mantinePaperProps={{
          onDragEnter: () => setHoveredTable('table-1'),
          sx: {
            outline: hoveredTable === 'table-1' ? '2px dashed pink' : undefined,
          },
        }}
        renderTopToolbarCustomActions={() => (
          <Typography color="success.main" variant="h4">
            Nice List
          </Typography>
        )}
      />
      <MantineReactTable
        {...commonTableProps}
        data={data2}
        getRowId={(originalRow) => `table-2-${originalRow.firstName}`}
        mantineRowDragHandleProps={{
          onDragEnd: () => {
            if (hoveredTable === 'table-1') {
              setData1((data1) => [...data1, draggingRow.original]);
              setData2((data2) =>
                data2.filter((d) => d !== draggingRow.original),
              );
            }
            setHoveredTable(null);
          },
        }}
        mantinePaperProps={{
          onDragEnter: () => setHoveredTable('table-2'),
          sx: {
            outline: hoveredTable === 'table-2' ? '2px dashed pink' : undefined,
          },
        }}
        renderTopToolbarCustomActions={() => (
          <Typography color="error.main" variant="h4">
            Naughty List
          </Typography>
        )}
      />
    </Box>
  );
};

export default Example;