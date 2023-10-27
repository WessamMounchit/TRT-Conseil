import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { register } from "../api/auth";
import { toast } from "react-toastify";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SignUp() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    role: ""
  });

  
  const { email, password, role } = inputs;
  console.log(role)

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await register({ email, password, role });
      
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
        <Avatar sx={{ m: 1, bgcolor: "black" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Inscription à TRT Conseil
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => onChange(e)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <FormControl required sx={{ mt: 2 }} fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              name="role"
              id="role"
              value={role}
              label="Role"
              onChange={(e) => onChange(e)}
            >
              <MenuItem value={4}>Candidat</MenuItem>
              <MenuItem value={3}>Recruteur</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            S&apos;inscrire
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Vous avez déjà un compte ? Connectez-vous"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
