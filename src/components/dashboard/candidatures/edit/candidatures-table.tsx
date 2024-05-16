import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CandidatesList, candidateClient } from "@/lib/candidates/client";

export default function CandidatesTable({
  selectCandidates,
  setSelected,
  preSelectedItems,
}: {
  selectCandidates: any[];
  setSelected: Function;
  preSelectedItems: string[];
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

  React.useEffect(() => {
    setSelected(preSelectedItems);
  }, [preSelectedItems]);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.candidateUserId}
        checkboxSelection
        rowSelectionModel={selectCandidates}
        onRowSelectionModelChange={(value: any[]) => setSelected(value)}
        {...data}
      />
      {error?.error && error?.error}
    </Box>
  );
}
