"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CandidatesList, candidateClient } from "@/lib/candidates/client";
import NoResults from "@/components/core/no-results";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import SelectInput from "./select-input";

const CandidatesTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = React.useState<CandidatesList[]>([]);
  const [error, setError] = React.useState<{ error?: string }>();
  const [candidate, setCandidate] = React.useState<CandidatesList>();
  const [candidature, setCandidature] = React.useState<string | undefined>();
  const [isPending, setIsPending] = React.useState<boolean>(false);

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

  const handleGenerateTest = async () => {
    if (candidature && candidate?.candidateUserId) {
      setIsPending(true);

      //const res = await candidateClient.generateCandidateTest(
      //candidate?.candidateUserId,
      //candidature
      //);

      //console.log(res);
      return "www.holaqueai.com/test/asd14987";
    }

    alert("Ingresar una candidatura valida");
  };

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
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: "10px", height: "100%" }}>
            <Button
              sx={{ width: "fit-content", margin: "auto 0", padding: "4px" }}
              variant="outlined"
              onClick={() => {
                setCandidate(params.row);
                handleOpen();
              }}
            >
              Crear prueba
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            boxShadow: 24,
            outline: "none",
            p: 4,
          }}
        >
          <Stack spacing={5}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Seleccione la candidatura que desea evaluar para :{" "}
              {candidate?.name + " " + candidate?.surname}
            </Typography>

            {isPending ? (
              <CircularProgress sx={{ width: "100%", margin: "auto" }} />
            ) : (
              <SelectInput
                candidature={candidature}
                setCandidature={setCandidature}
              />
            )}

            <Box
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
              }}
            >
              <Button sx={{ p: 0 }} onClick={handleClose}>
                Cancelar
              </Button>
              <Button onClick={handleGenerateTest}>Continuar</Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default CandidatesTable;
