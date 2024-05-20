"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CandidatesList, candidateClient } from "@/lib/candidates/client";
import NoResults from "@/components/core/no-results";
import { Box } from "@mui/material";
import Loading from "@/components/core/loading";

const CandidatesTable = () => {
  const [data, setData] = React.useState<CandidatesList[]>([]);
  const [error, setError] = React.useState<{ error?: string }>();
  const [isDataPending, setIsDataPending] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getData = async () => {
      const res = await candidateClient.getCandidatesList();

      setIsDataPending(false);
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
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 160,
      flex: 1,
    },
  ];

  return (
    <div style={{ minHeight: 400, width: "100%" }}>
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
        sx={data.length ? {} : { height: "400px" }}
        slots={{
          noRowsOverlay: () => (
            <Box sx={{ display: "flex", margin: "auto" }}>
              {error?.error ? (
                <NoResults text={error.error} />
              ) : (
                <Loading variable={isDataPending} />
              )}
            </Box>
          ),
        }}
        pageSizeOptions={[15]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default CandidatesTable;
