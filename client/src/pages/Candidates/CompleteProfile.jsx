import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { completeCandidateProfile } from "../../api/candidates";

export default function CompleteCandidatProfile() {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
  });

  const [cv, setCv] = useState(null);

  const handleCvChange = (e) => {
    const selectedFile = e.target.files[0];
    setCv(selectedFile);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const { firstName, lastName } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("cv", cv);

      const response = await completeCandidateProfile(formData);

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
        <Avatar sx={{ m: 1, bgcolor: "green" }}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Compléter son profil
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                value={firstName}
                onChange={onChange}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                value={lastName}
                onChange={onChange}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <Button sx={{ bgcolor: "green" }}
                component="label"
                fullWidth
                variant="contained"
                value={cv}
                onChange={handleCvChange} 
                name="cv"
                startIcon={<CloudUploadIcon />}
              >
                Votre CV
                <VisuallyHiddenInput
                  accept="application/pdf"
                  type="file"
                  required
                />
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Enregistrer
          </Button>
          <Grid container justifyContent="flex-end"></Grid>
        </Box>
      </Box>
    </Container>
  );
}
