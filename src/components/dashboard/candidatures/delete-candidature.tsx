"use client";
import * as React from "react";
import { candidatureClient } from "@/lib/canidature/client";
import { Box, Button, Modal, Typography } from "@mui/material";
import { Trash } from "@phosphor-icons/react";

const DeleteCandidature = ({
  candidatureId,
  candidatureName,
}: {
  candidatureId: string;
  candidatureName: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOnClick = async () => {
    const res = await candidatureClient.deleteCandidature(candidatureId);
    if (res.error) {
      alert(res.error);
      handleClose();
      return;
    }
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ width: "fit-content", margin: "auto 0", padding: "4px" }}
        color="error"
        onClick={handleOpen}
      >
        <Trash size={20} />
      </Button>

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
            borderRadius: "8px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿Estás seguro de que quieres eliminar esta candidatura?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {candidatureName}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button sx={{ p: 0 }} onClick={handleClose}>
              Cancelar
            </Button>
            <Button onClick={handleOnClick}>Continuar</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteCandidature;
