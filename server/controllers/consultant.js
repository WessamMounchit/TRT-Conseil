const db = require("../db");

exports.approveAccount = async (req, res) => {
  const accountId = req.params.id;

  try {
    const query = "UPDATE users SET is_active = $1 WHERE id = $2";
    const values = [true, accountId];
    await db.query(query, values);

    return res.status(200).json({ message: "Compte approuvé avec succès" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur lors de l'approbation du compte" });
  }
};
