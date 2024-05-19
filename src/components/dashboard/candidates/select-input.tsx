import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CandidatureList, candidatureClient } from "@/lib/canidature/client";

const SelectInput = ({
  candidature,
  setCandidature,
}: {
  candidature?: string;
  setCandidature: Function;
}) => {
  const [data, setData] = React.useState<CandidatureList[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setCandidature(event.target.value as string);
  };

  React.useEffect(() => {
    const getData = async () => {
      const res = await candidatureClient.getCandidaturesList();

      if (Array.isArray(res)) {
        console.log(res);
        return setData(res);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Candidatura</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Candidatura"
          onChange={handleChange}
        >
          {data.length > 0 &&
            data.map((item, index) => (
              <MenuItem value={item._id} key={index}>
                {item.name} - {item._id}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectInput;
