"use client";
import { CandidatureList, candidatureClient } from "@/lib/canidature/client";
import { Box, Card } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import RouterLink from "next/link";
import * as React from "react";

export interface Candidature {
  _id: string;
  title: string;
  description: string;
  skills: string[];
  createdAt: Date;
}

const CandidaturesTable = () => {
  const [data, setData] = React.useState<CandidatureList[]>([]);
  const [error, setError] = React.useState<{ error?: string }>();

  React.useEffect(() => {
    const getData = async () => {
      const res = await candidatureClient.getCandidaturesList();

      if (Array.isArray(res)) {
        return setData(res);
      }

      setError(res);
    };
    getData();
  }, []);

  const columns: GridColDef<(typeof data)[number]>[] = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Título",
      width: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: "Descripción",
      minWidth: 150,
      flex: 1,
      editable: true,
    },
    {
      field: "numCandidates",
      headerName: "Candidatos",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: (params) => {
        return (
          <RouterLink href={`/dashboard/candidatures/${params.row.jobOfferId}`}>
            {params.value}
          </RouterLink>
        );
      },
    },
  ];

  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
        <DataGrid
          rows={data}
          getRowId={(row: CandidatureList) => row._id}
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

export default CandidaturesTable;
