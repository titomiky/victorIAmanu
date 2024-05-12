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
      console.log(res);

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

  return (
    <Card>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "800px" }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              const isSelected = selected?.has(row.jobOfferId);

              return (
                <TableRow hover key={row.jobOfferId} selected={isSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.jobOfferId);
                        } else {
                          deselectOne(row.jobOfferId);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Stack
                      sx={{ alignItems: "center" }}
                      direction="row"
                      spacing={2}
                    >
                      <Typography variant="subtitle2">
                        {row.jobOfferId}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <Link
                      component={RouterLink}
                      href={`/dashboard/candidatures/${row.jobOfferId}`}
                    >
                      Candidatos
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default CandidaturesTable;
