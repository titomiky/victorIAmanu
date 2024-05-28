"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CandidatesList, candidateClient } from "@/lib/candidates/client";
import NoResults from "@/components/core/no-results";
import { Box, Link } from "@mui/material";
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
    {
      field: "name",
      headerName: "Nombre",
      minWidth: 150,
      flex: 1,
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
      minWidth: 250,
      flex: 1,
    },
    {
      field: "age",
      headerName: "Edad",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "currentSalary",
      headerName: "Salario actual",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "desiredSalary",
      headerName: "Salario deseado",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "cVpdfUrl",
      headerName: "CV",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        console.log(params);
        return (
          <Link
            component={"a"}
            target="_blank"
            href={params.row.cVpdfUrl ?? ""}
          >
            Ver CV
          </Link>
        );
      },
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

export default CandidatesTable;
