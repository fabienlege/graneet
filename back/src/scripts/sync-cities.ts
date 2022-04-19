import { NestFactory } from "@nestjs/core"
import { AppModule } from "src/app.module"
import { CityService } from "src/city/city.service";

/**
 * Run the syncCities function from cli
 */
const syncCities = async () => {
  // Initialize the app
  const app = await NestFactory.create(AppModule);

  // Initialize the city service
  const cityService = app.get(CityService);

  // Run the syncCities function
  await cityService.syncCities();
}
syncCities();