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
import { login } from "../api/auth";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/authSlice";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import { useState } from "react";

export default function SignIn() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
  setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await login({ email, password });
      const { role, token } = response.data;
      console.log(response);

      dispatch(authenticateUser());
      secureLocalStorage.setItem("token", token);
      secureLocalStorage.setItem("isAuth", "true");
      secureLocalStorage.setItem("role", role);

      toast.success(response.data.info);
    } catch (error) {
      console.error(error.message);
      toast.error(error.response.data.errors[0]);
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
          Connexion à TRT Conseil
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
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
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Se connecter
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Vous n'avez pas de compte ? Créez un compte"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
