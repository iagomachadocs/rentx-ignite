import "dotenv/config";
import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash(process.env.ADMIN_PASSWORD, 8);

  await connection.query(`
    INSERT INTO USERS(id, name, email, password, is_admin, driver_license, created_at)
     values('${id}', 'admin', '${process.env.ADMIN_USER}', '${password}', true, 'XXXXXX', 'now()')
  `);

  await connection.close();
}

create().then(() => console.log("User admin created!"));
