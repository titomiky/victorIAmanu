"use client";
import { useSelection } from "@/hooks/use-selection";
import { CandidatureList, candidatureClient } from "@/lib/canidature/client";
import {
  Box,
  Card,
  Checkbox,
  Divider,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import RouterLink from "next/link";
import * as React from "react";

export interface Candidature {
  id: string;
  title: string;
  description: string;
  skills: string[];
  createdAt: Date;
}

interface CandidatureTableProps {
  count?: number;
  page?: number;
  rows?: Candidature[];
  rowsPerPage?: number;
}

const CandidaturesTable = ({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: CandidatureTableProps) => {
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

  const rowIds = React.useMemo(() => {
    return data.map((customer) => customer.jobOfferId);
  }, [data]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } =
    useSelection(rowIds);

  const selectedSome =
    (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < data?.length;
  const selectedAll = data?.length > 0 && selected?.size === data?.length;

  const columns: GridColDef<(typeof data)[number]>[] = [
    { field: "candidateUserId", headerName: "ID", width: 90 },
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
      field: "numberOfCandidates",
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
          getRowId={(row: CandidatureList) => row.jobOfferId}
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
      </Box>
    </Card>
  );
};

export default CandidaturesTable;
