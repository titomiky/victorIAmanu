"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CandidatesList, candidateClient } from "@/lib/candidates/client";
import NoResults from "@/components/core/no-results";

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
      width: 160,
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      sortable: false,
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
        slots={{
          noRowsOverlay: () => (
            <NoResults
              text={
                error?.error
                  ? error.error
                  : "No hay candidatos por el momento ... "
              }
            />
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
