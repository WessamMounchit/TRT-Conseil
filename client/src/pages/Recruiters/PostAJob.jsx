import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { useState } from "react";
import { createJobOffer } from "../../api/recruiters";
import WorkIcon from '@mui/icons-material/Work';

export default function PostAJob() {
  const [inputs, setInputs] = useState({
    jobTitle: "",
    workLocation: "",
    description: ""
  });

  const { jobTitle, workLocation, description } = inputs;

  const onChange = (e) =>
  setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createJobOffer({ jobTitle, workLocation, description });

      toast.success(response.data.message);
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "red" }}>
          <WorkIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Poster un annonce
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="jobTitle"
            label="Titre de l'annonce"
            name="jobTitle"
            autoFocus
            value={jobTitle}
            onChange={(e) => onChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="workLocation"
            label="Lieu du travail"
            id="workLocation"
            value={workLocation}
            onChange={(e) => onChange(e)}
          />
          <TextField sx={{ mt: 2}}
          id="description"
          label="Description de l'annonce"
          name="description"
          value={description}
          onChange={(e) => onChange(e)}
          required
          fullWidth
          multiline
          rows={4}
        />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "green" }}
          >
            Poster
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
