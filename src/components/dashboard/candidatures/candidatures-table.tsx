"use client";
import { CandidatureList, candidatureClient } from "@/lib/canidature/client";
import { Box, Button, Card, dividerClasses } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import RouterLink from "next/link";
import * as React from "react";
import DeleteCandidature from "./delete-candidature";
import NoResults from "@/components/core/no-results";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
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
          <RouterLink
            style={{ marginLeft: "10px" }}
            href={`/dashboard/candidatures/${params.row._id}`}
          >
            {params.value}
          </RouterLink>
        );
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: "10px", height: "100%" }}>
            <Button
              LinkComponent={RouterLink}
              href={`/dashboard/candidatures/${params.row._id}/edit`}
              sx={{ width: "fit-content", margin: "auto 0", padding: "4px" }}
              variant="contained"
              color="success"
            >
              Editar
            </Button>
            <DeleteCandidature candidatureId={params.row._id} />
          </Box>
        );
      },
    },
  ];

  return (
    <div style={{ minHeight: 400, width: "100%" }}>
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
        localeText={{ noRowsLabel: "This is a custom message :)" }}
        slots={{
          noRowsOverlay: () => (
            <NoResults
              text={
                error?.error
                  ? error.error
                  : "No tienes ninguna candidatura creada"
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

export default CandidaturesTable;
