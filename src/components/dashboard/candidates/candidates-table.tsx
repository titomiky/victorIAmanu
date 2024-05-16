"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CandidatesList, candidateClient } from "@/lib/candidates/client";

const CandidatesTable = () => {
  const [data, setData] = React.useState<CandidatesList[]>([]);
  const [error, setError] = React.useState<{ error?: string }>();

  React.useEffect(() => {
    const getData = async () => {
      const res = await candidateClient.getCandidatesList();

      if (Array.isArray(res)) {
        return setData(res);
      }

      setError(res);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  const columns: GridColDef<(typeof data)[number]>[] = [
    { field: "candidateUserId", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Nombre",
      width: 150,
      editable: true,
    },
    {
      field: "surname",
      headerName: "Apellido",
      minWidth: 150,
      flex: 1,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      width: 160,
    },
  ];

  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
        <DataGrid
          rows={data}
          getRowId={(row: CandidatesList) => row.candidateUserId}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[15]}
          checkboxSelection
          disableRowSelectionOnClick
        />
        {error?.error && error.error}
      </Box>
    </Card>
  );
};

export default CandidatesTable;
