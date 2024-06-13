"use client";
import React from "react";
import { Alert, Box, Button, CircularProgress, Link, Modal, Stack, Tooltip, Typography } from "@mui/material";
import { CandidatesList, candidateClient } from "@/lib/candidates/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import NoResults from "@/components/core/no-results";
import { CheckCircle, Copy } from "@phosphor-icons/react";
import Loading from "@/components/core/loading";
import RouterLink from "next/link";
import { paths } from "@/paths";

const CandidatesByOffer = ({ candidatureId }: { candidatureId: string }) => {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<CandidatesList[]>([]);
  const [error, setError] = React.useState<{ error?: string }>();
  const [urlError, setUrlError] = React.useState<{ error?: string }>({});
  const [candidate, setCandidate] = React.useState<CandidatesList>();
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [sessionUrl, setSessionUrl] = React.useState<string | undefined>();
  const [isDataPending, setIsDataPending] = React.useState<boolean>(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIsPending(false);
    setUrlError({});
    setSessionUrl(undefined);
  };

  React.useEffect(() => {
    const getData = async () => {
      const res = await candidateClient.getCandidatesByOffer(candidatureId);

      setIsDataPending(false);

      if (Array.isArray(res)) {
        return setData(res);
      }

      setError(res);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  const handleGenerateTest = async () => {
    setIsPending(true);

    if (candidate?.candidateUserId) {
      const res = await candidateClient.generateCandidateTest(candidate?.candidateUserId, candidatureId);

      if (typeof res !== "string" && res?.error) {
        setUrlError(res);
      }

      if (typeof res === "string") {
        setSessionUrl(res);
      }
    }

    setIsPending(false);
  };

  const columns: GridColDef<(typeof data)[number]>[] = [
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
    {
      field: "age",
      headerName: "Edad",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "currentSalary",
      headerName: "Salario actual (bruto año)",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "desiredSalary",
      headerName: "Salario deseado (bruto año)",
      minWidth: 150,
      flex: 1,
    },

    {
      field: "actions",
      headerName: "Acciones",
      width: 270,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", gap: "10px", height: "100%" }}>
            <Button
              LinkComponent={RouterLink}
              href={`${paths.dashboard.candidatures}/${candidatureId}/${params.row.candidateUserId}`}
              sx={{ width: "fit-content", margin: "auto 0", padding: "4px" }}
            >
              Ver aptitudes
            </Button>
            <Button
              sx={{ width: "fit-content", margin: "auto 0", padding: "4px" }}
              variant="contained"
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
      <div style={{ minHeight: "400px", width: "100%" }}>
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
                {isDataPending ? <Loading variable={isDataPending} /> : <NoResults text={error?.error ?? "No hay candidaturas ... "} />}
              </Box>
            ),
          }}
          pageSizeOptions={[15]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
            borderRadius: "8px",
          }}
        >
          <Stack spacing={5}>
            {!sessionUrl && (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Desea crear un link para evaluar al candidato : {candidate?.name + " " + candidate?.surname} ?
              </Typography>
            )}
            {isPending ? (
              <CircularProgress sx={{ margin: "16px auto" }} />
            ) : sessionUrl ? (
              <Box sx={{ textAlign: "center", display: "grid", gap: "16px" }}>
                <Alert icon={<CheckCircle fontSize="inherit" />} severity="success" sx={{ placeContent: "center" }}>
                  Link generado con exito ! 
                </Alert>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: "auto",
                    gap: "16px",
                  }}
                >
                  <Link component={"a"} href={sessionUrl} color={"black"}>
                    {sessionUrl}
                  </Link>
                  <Tooltip title="Copiar">
                    <Button sx={{ padding: 0, margin: 0, width: "fit-content" }} onClick={() => navigator.clipboard.writeText(sessionUrl)}>
                      <Copy size={24} />
                    </Button>
                  </Tooltip>
                </Typography>
              </Box>
            ) : (
              urlError?.error
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
              {sessionUrl ? <Button onClick={handleClose}>Continuar</Button> : <Button onClick={isPending ? () => {} : () => handleGenerateTest()}>Continuar</Button>}
            </Box>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default CandidatesByOffer;
