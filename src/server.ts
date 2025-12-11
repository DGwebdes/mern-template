import app from "./app";
import { config } from "./config/config";

app.listen(config.port, () => {
  console.log(`First wheel app listening at http://localhost:${config.port}`);
});
