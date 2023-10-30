import { Button, Grid, Typography } from "@mui/material";
import Header from "../../components/Header";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <>
      <Header />
      <Grid
        container
        direction={"column"}
        justifyContent="space-between"
        alignItems="center"
        gap={4}
        mt={29}
      >
        <Typography component="h1" variant="h5" fontWeight="bold">
          Bienvenue sur le dashboard de l&apos;admin, vous pouvez :
        </Typography>
        <Link to="/admin/add-consultant">
          <Button
            variant="contained"
            endIcon={<PersonAddIcon />}
            sx={{ textAlign: "center" }}
            color="success"
          >
            Ajouter un consultant
          </Button>
        </Link>
      </Grid>
    </>
  );
}
