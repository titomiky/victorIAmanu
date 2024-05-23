"use client";
import { CandidatureList, candidatureClient } from "@/lib/canidature/client";
import { Box, Button, Card, Link, dividerClasses } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import RouterLink from "next/link";
import * as React from "react";
import DeleteCandidature from "./delete-candidature";
import NoResults from "@/components/core/no-results";
import Loading from "@/components/core/loading";

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
  const [isDataPending, setIsDataPending] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getData = async () => {
      const res = await candidatureClient.getCandidaturesList();

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
    {
      field: "name",
      headerName: "Título",
      width: 150,
      flex: 1,
      editable: true,
    },
    {
      field: "description",
      headerName: "Descripción",
      width: 200,
      editable: true,
    },
    {
      field: "numCandidates",
      headerName: "Candidatos",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 180,
      flex: 1,

      renderCell: (params) => {
        return (
          <Link
            component={RouterLink}
            style={{ marginLeft: "10px" }}
            href={`/dashboard/candidatures/${params.row._id}`}
          >
            Ver candidatos ( {params.value} )
          </Link>
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
              variant="outlined"
            >
              Editar
            </Button>
            <DeleteCandidature
              candidatureId={params.row._id}
              candidatureName={params.row.name}
            />
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
        sx={data.length ? {} : { height: "400px" }}
        slots={{
          noRowsOverlay: () => (
            <Box
              sx={{
                display: "flex",
                margin: "auto",
                justifyContent: "center",
                alignContent: "center",
                height: "100%",
              }}
            >
              {isDataPending ? (
                <Loading variable={isDataPending} />
              ) : (
                <NoResults text={error?.error ?? "No hay candidaturas ... "} />
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

export default CandidaturesTable;
