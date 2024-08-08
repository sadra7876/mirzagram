import { AppDataSource } from "dependencies";

export const clearDatabase = async () => {
  // const appDataSource = new DataSource(databaseConfig);
  const entities = AppDataSource.entityMetadatas;

  try {
    for await (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name);

      await repository.query(`DELETE  FROM  ${entity.tableName} ;`);
    }
  } catch (err) {
    console.log(err);
  }
};
