import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CandidatesList, candidateClient } from "@/lib/candidates/client";
import NoResults from "@/components/core/no-results";

export default function SelectCandidate({
  setSelected,
}: {
  setSelected: Function;
}) {
  const [error, setError] = React.useState<{ error?: string }>();
  const [data, setData] = React.useState<CandidatesList[]>([]);

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

  const handleRowSelection = (value: any[]) => {
    setSelected(value);
  };

  const columns: GridColDef<(typeof data)[number]>[] = [
    { field: "candidateUserId", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "surname",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "email",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      {data.length > 0 && (
        <DataGrid
          rows={data}
          getRowId={(row) => row.candidateUserId}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{
            noRowsOverlay: () => <NoResults />,
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleRowSelection}
        />
      )}
      {error?.error && error?.error}
    </Box>
  );
}
